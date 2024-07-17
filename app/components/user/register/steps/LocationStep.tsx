"use client"

import { GlobalContext } from '@/contexts'
import { AxiosClient } from '@/services'
import { ListCity, ListDistrict } from '@/types'
import { customStyles } from '@/utils'
import { useContext, useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import ReactMapGL, { Marker } from '@goongmaps/goong-map-react'

interface Option {
    id: string;
    value: string;
    label: string
}

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const LocationStep = () => {
    const { setUser, user } = useContext(GlobalContext) || {}
    const [selectCity, setSelectedCity] = useState<Option | null>(null)
    const [selectDistrict, setSelectedDistrict] = useState<Option | null>(null)
    const [isUserDataFetched, setIsUserDataFetched] = useState(false)
    const [viewport, setViewport] = useState({
        latitude: 10.762622,
        longitude: 106.660172,
        zoom: 12
    })

    //Fetch city
    const { data: listCity, error: errorCity } = useSWR<ListCity>(`/api/cities`, fetcher)
    if (errorCity) toast.error(listCity?.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const optionCity = useMemo(() => {
        return listCity?.data.map(city => ({ id: city.id, value: city.name, label: city.name })) || []
    }, [listCity])

    const handleCityChange = (newValue: Option | null) => {
        if (newValue) {
            setSelectedCity(newValue)
            setSelectedDistrict(null)
        }
    }

    //Fetch district
    const { data: listDistrict, error: errorDistrict } = useSWR<ListDistrict>(selectCity ? `/api/districts/city/${selectCity.id}` : null, fetcher)
    if (errorDistrict) toast.error(listDistrict?.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const optionDistrict = useMemo(() => {
        return listDistrict?.data.map(district => ({ id: district.id, value: district.name, label: district.name })) || []
    }, [listDistrict])

    // Get state district
    const handleDistrictChange = (newValue: Option | null) => {
        if (newValue) {
            setSelectedDistrict(newValue)
        }
    }

    useEffect(() => {
        selectCity
        // Cập nhật user khi selectCity hoặc selectDistrict thay đổi
        if (selectCity && selectDistrict && setUser) {
            setUser(prevUser => ({
                ...prevUser,
                playingArea: [`${selectCity.value}, ${selectDistrict.value}`],
            }));
        }

    }, [selectCity, selectDistrict, setUser])

    useEffect(() => {
        // Thiết lập giá trị ban đầu cho selectCity dựa trên user.playingArea
        if (!isUserDataFetched && user && user.playingArea && !selectCity) {
            const [city, district] = user.playingArea.toString().split(", ")
            setSelectedCity(optionCity.find(option => option.value.toLowerCase() === city.toLowerCase()) || null)
            if (!city && !district) {
                setIsUserDataFetched(true)
            }
        }
    }, [user, optionCity, isUserDataFetched, selectCity])

    useEffect(() => {
        // Thiết lập giá trị ban đầu cho selectDistrict khi selectCity đã được thiết lập
        if (selectCity && user && user.playingArea) {
            const [city, district] = user.playingArea.toString().split(", ")
            setSelectedDistrict(optionDistrict.find(option => option.value.toLowerCase() === district.toLowerCase()) || null)
        }
    }, [user, optionDistrict, selectCity])

    useEffect(() => {
        if (selectDistrict) {
            fetch(`https://rsapi.goong.io/Geocode?address=${selectDistrict.value}&api_key=${process.env.CHECK_MAP}`)
                .then(response => response.json())
                .then(data => {
                    const location = data.results[0].geometry.location;
                    setViewport(prevState => ({
                        ...prevState,
                        latitude: location.lat,
                        longitude: location.lng,
                    }))
                })
        }
    }, [selectDistrict])


    return (
        <div className="
                relative 
                w-full 
                flex
                flex-col
                gap-3 
                h-full
                overflow-y-auto
            "
        >
            <link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.css' rel='stylesheet' />
            <Select
                name="city"
                options={optionCity}
                styles={customStyles}
                instanceId="listCity"
                placeholder="Chọn thành phố"
                onChange={handleCityChange}
                value={selectCity}
            />
            <Select
                name="district"
                options={optionDistrict}
                styles={customStyles}
                instanceId="listDistrict"
                placeholder="Chọn Quận/Huyện"
                onChange={handleDistrictChange}
                isDisabled={!selectCity}
                value={selectDistrict}
            />
            <ReactMapGL
                {...viewport}
                width="86vw"
                height="400px"
                onViewportChange={(nextViewport: {latitude: number, longitude: number, zoom: number}) => setViewport(nextViewport)}
                mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                goongApiAccessToken={process.env.VIEW_MAP}
            >
                <Marker latitude={viewport.latitude} longitude={viewport.latitude} offsetLeft={-20} offsetTop={-10}>
                    <div>You are here</div>
                </Marker>
            </ReactMapGL>
        </div>
    )
}

export default LocationStep
