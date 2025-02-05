const TaskButton = ({ toolText, onClick, btnColor, btnIcon }) => {
  return (
    <div className="tooltip" data-tip={`${toolText}`}>
      <button
        onClick={onClick}
        className={`btn btn-circle btn-xs sm:btn-sm ${btnColor} hover:btn-accent`}
      >
        {btnIcon}
      </button>
    </div>
  );
};

export default TaskButton;
