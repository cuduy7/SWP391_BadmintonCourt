'use client';

import { ProductDetailContentData } from '@/types';
import { Button } from '../../providers';
import { formatMoney, validateAddress, validateTitle } from '@/utils';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/contexts';
import { toast } from 'react-toastify';
import { addHours, format, parse } from 'date-fns';
import Decimal from 'decimal.js';
import { IoTimeOutline } from 'react-icons/io5';
import { MdOutlineAttachMoney, MdOutlineDateRange } from 'react-icons/md';
import {
  useContinuePaymentModal,
  usePolicyModal,
  useUnauthorizeModal,
} from '@/hooks';
import ProductMethod from './ProductMethod';
import { TbRefresh } from 'react-icons/tb';

const ProductDetail: React.FC<ProductDetailContentData> = ({
  id,
  addressSlot,
  levelSlot,
  categorySlot,
  postSlot,
  title,
  price,
  userId,
}) => {
  const { user, isAuthUser } = useContext(GlobalContext) || {};
  const unauthorizeModal = useUnauthorizeModal();
  const continuePaymentModal = useContinuePaymentModal();
  const policyModal = usePolicyModal();

  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: string[];
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [checkedStatus, setCheckedStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const checkUser =
    (user && user.id === userId) ||
    (user && user.role && user.role.toLowerCase() !== 'user');

  const handleCheckboxChange = (
    dateSlot: string,
    slot: string,
    isChecked: boolean,
  ) => {
    setSelectedSlots((prevState) => {
      const existingSlots = prevState[dateSlot] || [];
      if (isChecked) {
        return {
          ...prevState,
          [dateSlot]: [...existingSlots, slot],
        };
      } else {
        return {
          ...prevState,
          [dateSlot]: existingSlots.filter((s) => s !== slot),
        };
      }
    });

    setCheckedStatus((prevState) => ({
      ...prevState,
      [`${dateSlot}-${slot}`]: isChecked,
    }));

    setTotalPrice((prevPrice) => {
      const selectedCount =
        Object.values(selectedSlots).flat().length + (isChecked ? 1 : -1);
      return selectedCount * price;
    });
  };

  const handleRefersh = () => {
    setSelectedSlots({});
    setTotalPrice(0);
    setCheckedStatus({});
    setSelectedDate(null);
    toast.info("Đã reset slot")
  };

  const handleClickHost = () => {
    toast.error('Bạn là chủ sân không thể đặt chỗ trong bài đăng của mình', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  type OriginalData = {
    [date: string]: string[];
  };

  type FormattedData = {
    dateSlot: string;
    slot: string[];
  };

  const formatSlotData = (data: OriginalData): FormattedData[] => {
    return Object.entries(data).map(([dateSlot, slot]) => ({ dateSlot, slot }));
  };

  const handleClick = () => {
    let slotsInfoArray: { dateSlot: string; slot: string[] }[] = [];

    if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
      toast.error('Phải chọn ngày bạn muốn đặt', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    slotsInfoArray = formatSlotData(selectedSlots);

    if (id) {
      continuePaymentModal.setSlotsIdArray(slotsInfoArray);
      continuePaymentModal.setCheckMethod(false);
      continuePaymentModal.onOpen(id);
    }
  };

  return (
    <div
      className="
                relative
                bg-gray-200
                flex 
                flex-col 
                w-full 
                rounded-xl 
                px-4
                gap-3
                justify-around
                transition-all
                duration-500
                lg:min-h-[30rem]
                max-h-auto
            "
      key={id ?? '1'}
    >
      <h1 className="text-3xl font-semibold text-gray-600">
        {validateTitle(title)}
      </h1>
      <section className="relative space-x-3">
        <span className="whitespace-nowrap font-semibold text-gray-600">
          Địa chỉ:
        </span>
        <span className="break-words font-semibold">
          {validateAddress(addressSlot)}
        </span>
      </section>
      <section className="relative font-semibold flex flex-col gap-2 w-full">
        <label className="whitespace-nowrap text-gray-600">Chọn ngày:</label>
        <div className="flex gap-3 items-center">
          <select
            value={selectedDate ?? ''}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled>
              Chọn ngày
            </option>
            {postSlot &&
              postSlot.map((item, index) => (
                <option key={index} value={item.dateSlot}>
                  {item.dateSlot}
                </option>
              ))}
          </select>
          <button className="flex-shrink-0 border border-primary-blue-cus text-primary-blue-cus p-2 rounded-full" onClick={handleRefersh}>
            <TbRefresh size={20} />
          </button>
        </div>
      </section>
      {selectedDate && (
        <section className="relative font-semibold flex flex-col gap-2 mt-4">
          <label className="whitespace-nowrap text-gray-600">
            Chọn chỗ đặt:
          </label>
          <div className="grid grid-cols-4 gap-3">
            {postSlot &&
              postSlot
                .find((item) => item.dateSlot === selectedDate)
                ?.slot.map((slot, slotIndex) => (
                  <div
                    className="col-span-1 flex items-center gap-2"
                    key={slotIndex}
                  >
                    <input
                      type="checkbox"
                      checked={
                        checkedStatus[`${selectedDate}-${slot}`] || false
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          selectedDate,
                          slot,
                          e.target.checked,
                        )
                      }
                      className="ring-0 outline-none focus:ring-0 focus:outline-none"
                    />
                    <span className="text-gray-600">{slot}</span>
                  </div>
                ))}
          </div>
        </section>
      )}
      {!checkUser && (
        <section className="relative flex gap-3 font-semibold items-end">
          <label className="whitespace-nowrap text-gray-600">Tổng tiền:</label>
          <span className="break-words text-primary-blue-cus text-xl">
            {totalPrice
              ? formatMoney(new Decimal(totalPrice ? totalPrice : 0))
              : 0}
          </span>
        </section>
      )}
      {user && user.id === userId ? (
        <Button
          title="Đặt chỗ ngay"
          style="py-3 justify-center"
          onClick={handleClickHost}
        />
      ) : !isAuthUser ? (
        <Button
          title="Đặt chỗ ngay"
          style="py-3 justify-center"
          onClick={unauthorizeModal.onOpen}
        />
      ) : (
        !checkUser && (
          <Button
            title="Đặt chỗ ngay"
            style="py-3 justify-center"
            onClick={handleClick}
          />
        )
      )}
    </div>
  );
};

export default ProductDetail;
