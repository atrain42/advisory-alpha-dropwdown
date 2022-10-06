const ViewButton = ({ viewRolesHandler, viewAllRoles }) => {
  return (
    <button
      id="view-all__btn"
      style={{ marginTop: "10px", marginBottom: "5px" }}
      onClick={viewRolesHandler}
    >
      {!viewAllRoles ? "View more" : "View less"}
    </button>
  );
};

export default ViewButton;
