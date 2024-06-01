import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import { createEventAction, getRestaurantsEvents } from "../../component/State/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
    setFormValues({ ...formValues, [dateType]: formattedDate });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt
      })
    );
    handleCloseModal();
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurantsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant, dispatch, auth.jwt, jwt]);

  return (
    <div>
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={handleOpenModal}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((item) => (
          <EventCard key={item.id} item={item} isCustomer={false} />
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                      label="Start Date & Time"
                      value={formValues.startedAt ? dayjs(formValues.startedAt) : null}
                      onChange={(date) => handleDateChange(date, 'startedAt')}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <DateTimePicker
                      label="End Date & Time"
                      value={formValues.endsAt ? dayjs(formValues.endsAt) : null}
                      onChange={(date) => handleDateChange(date, 'endsAt')}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
