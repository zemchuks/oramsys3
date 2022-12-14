import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MaterialTable from "material-table"
import { useDispatch, useSelector } from "react-redux"
import { ratingAgenciesAction } from "../../../../redux/actions/ratingAgenciesAction"
import { countrieAction } from "../../../../redux/actions/countrieAction"

const RatingAgencies = () => {
  const [ratingData, setratingData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ratingAgenciesDatas = useSelector(
    (state) => state.ratingAgenciesData?.ratingAgencies
  )
  const countryOptions = useSelector((state) => state.countryData.country)

  useEffect(() => {
    dispatch(countrieAction("all"))
  }, [dispatch])

  // useEffect(() => {
  //   setratingData(ratingAgenciesDatas)
  // }, [ratingAgenciesDatas])

  useEffect(() => {
    // console.log('ratingAgenciesDatas', ratingAgenciesDatas.data)

    if (ratingAgenciesDatas.data) {
      setratingData(
        ratingAgenciesDatas.data?.map((item) => {
          return {
            name: item.name,
            city: item.city,
            street: item.street,
            postcode: item.postcode,
            country: countryOptions.data?.find(
              (ele) => ele._id === item.country
            )?.name,
            id: item._id,
          }
        })
      )
    }
  }, [ratingAgenciesDatas, countryOptions])

  useEffect(() => {
    dispatch(ratingAgenciesAction())
  }, [dispatch])

  return (
    <>
      <div className='product'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Rating agencies</h2>
          <button
            className='add_btn me-3'
            onClick={() => navigate("/rating-agencies-edit")}
          >
            {" "}
            <img src='../../assets/img/about/plus.png' alt="like" className='me-2' />
            Add
          </button>
        </div>
        <MaterialTable
          title=''
          columns={[
            { title: "Name", field: "name" },
            { title: "City", field: "city" },
            { title: "Street", field: "street" },
            { title: "Postcode", field: "postcode" },
            { title: "Country", field: "country" },
          ]}
          data={ratingData}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit RatingAgencie",
              onClick: (e, rowData) => {
                navigate(`/rating-agencies-edit?id=${rowData?.id}`, {
                  state: { isView: false }})
                console.log("rowData", rowData)
              },
            },
            {
              icon: "preview",
              tooltip: "View RatingAgencie",
              onClick: (e, rowData) =>
                navigate(`/rating-agencies-edit?id=${rowData?.id}`, {
                  state: { isView: true },
                }),
            },
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false,
          }}
        />
      </div>
    </>
  )
}

export default RatingAgencies
