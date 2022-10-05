const ViewButton = ({viewRolesHandler, viewAllRoles}) => {
  return (
    <button
      id="view-all__btn"
      style={{ marginTop: "10px", marginBottom: "5px" }}
      onClick={viewRolesHandler}
    >
      {!viewAllRoles ? "View all" : "View less"}
    </button>
  )

}

export default ViewButton