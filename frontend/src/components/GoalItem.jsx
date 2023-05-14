import { useDispatch } from 'react-redux';
import { selectGoal } from "../features/goals/goalSlice";
import { useNavigate, Link } from 'react-router-dom';


function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(selectGoal(goal));
    navigate('/product-details');
  };

  return (
    <>
      <div className='goal-container goal container' onClick={handleClick}>
        <div className='row'>
          <img src="https://rb.gy/p8qbb" alt='product-photo' />
        </div>
        <div className='row' style={{ color: "#004242" }}>
          {goal.name && <p className='text-truncate'>{goal.name}</p>}
          {goal.price && <p className='text-truncate'>Tshs. {goal.price}</p>}
        </div>
      </div>
    </>
  );
}

export default GoalItem;
