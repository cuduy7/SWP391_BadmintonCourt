export const handleChange = <T,>(e: React.ChangeEvent<HTMLInputElement>, setFormData: React.Dispatch<React.SetStateAction<T>>) => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
}
