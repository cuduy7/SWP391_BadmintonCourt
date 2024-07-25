import { VscStarFull, VscStarEmpty } from 'react-icons/vsc';

interface RatingProps {
  rating?: number;
  maxStars: number;
  sizeCus: number;
}

const Rating: React.FC<RatingProps> = ({ 
  rating=0, 
  maxStars,
  sizeCus 
}) => {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <div
            key={starNumber}
            className={`
                ${starNumber <= rating ? 'text-[#F8E011]' : 'text-gray-300'}
              `
            }
          >
            {starNumber <= rating ? (
              <VscStarFull size={sizeCus} />
            ) : (
              <VscStarFull size={sizeCus} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating