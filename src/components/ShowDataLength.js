// Controls how much data is rendered in the list from the API
// if user hasn't clicked "view all" button, then the trimmedData is rendered
// if user clicks "view all", then apiData is rendered

const ShowDataLength = ({apiData, filterData, setName, setRole, viewAllRoles, trimmedData}) => {
  function dataHandler() {
    return !viewAllRoles ? trimmedData : apiData
  }

  return (
    dataHandler()
        .filter((el) => el.name.toLowerCase().includes(filterData.toLowerCase()) || filterData === "")
        .map((el, index) => (
          <li
            key={index}
            onClick={() => {
              setName(el.name);
              setRole(el.role);
            }}
          >
            <h4>{el.name}</h4>
            <h5>{el.role}</h5>
          </li>
        ))

  )

}

export default ShowDataLength