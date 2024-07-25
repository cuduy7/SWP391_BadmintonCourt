"use client"

interface CustomToggleSwitchProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<CustomToggleSwitchProps> = ({
  isChecked,
  onChange,
}) => {
  const toggleSwitch = () => {
    onChange(!isChecked);
  };

  return (
    <div className="relative cursor-pointer">
      <div
        onClick={toggleSwitch}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        className={`
          block 
          w-12 
          h-8 
          rounded-full 
          border-4 
          border-solid 
          bg-white
          ${isChecked ? 'border-primary-blue-cus' : 'border-gray-600'} 
          transition
        `}
      >
        <div
          className={`
            dot 
            absolute 
            top-2 
            w-4 
            h-4 
            rounded-full  
            transition 
            ${isChecked ? 'left-6 bg-primary-blue-cus' : 'left-2 bg-gray-600'}
          `}
        />
      </div>
      <input
        type="checkbox"
        id="toggle"
        className="sr-only"
        checked={isChecked}
        onChange={toggleSwitch}
      />
    </div>
  );
};

export default ToggleSwitch;
