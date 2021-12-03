import React, { useEffect, useState } from "react";
import StartupActions from "../../../Stores/Startup/Actions";
import { connect } from "react-redux";
import { Card } from "../Card";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const AllNotifications = (props) => {
  let dataOBJ = {
    page: 0,
    size: 50,
  };

  const [data, setData] = useState(dataOBJ);

  const removeAllNotifications = () => {
    props.deleteNotifications(props.notificationsList, data, [0, dataOBJ.size]);
    props.clearNotificationCount();
  };

  const removeNotification = (notificationId) => {
    const removeNotificationsList = { notifications: [{ id: notificationId }] };
    props.deleteNotifications(removeNotificationsList, data, [0, 1]);
  };

  useEffect(() => {
    props.newNotifications(data);
  }, []);

  useEffect(() => {
    props.clearNotificationCount();
  }, [props.notificationsList.notifications]);

  return (
    <div>
      <Card type="primary" size="full" className="flex bg-white mb-10">
        <Typography color="primary" type="h1">
          All Notifications
          <Button
            type="danger"
            className="float-right"
            onClick={(e) =>
              window.confirm(
                "Are you sure you wish to clear all notifications?"
              ) && removeAllNotifications()
            }
          >
            Clear All
          </Button>
        </Typography>
      </Card>
      <Card type="primary" size="full" className="flex bg-white mb-10">
        {props.notificationsList.notifications.map((notification, key) => (
          <div className="flex shadow-xs relative">
            <a
              key={key}
              href="#"
              class="flex items-center px-4 py-3 border-b hover:bg-gray-100 w-full"
            >
              {/* <img
                class="h-8 w-8 rounded-full object-cover mx-1"
                src={notification.imageUrl}
              /> */}
              <FontAwesomeIcon
                icon={faTag}
                size="lg"
                className="text-red-500 mx-2"
              />
              <p class="text-sm mx-2 flex flex-col w-full text-black">
                <span class="font-bold" href="#">
                  {notification.title}
                </span>{" "}
                <span href="#">{notification.body}</span>
              </p>
            </a>
            <span
              className="absolute right-0 mt-4 mr-4"
              style={{ cursor: "pointer" }}
              onClick={() => removeNotification(notification.id)}
            >
              <svg
                class="fill-current  text-red-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  class="heroicon-ui"
                  d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                ></path>
              </svg>
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
};

const mapStateToProps = ({ startup: { newNotifications } }) => ({
  notificationsList: newNotifications,
});

// const mapDispatchToProps = (dispatch) => ({
//   newNotifications: (data) =>
//     dispatch(StartupActions.getNewNotifications(data)),
//   clearNotificationCount: () =>
//     dispatch(StartupActions.clearNotificationCount()),
//   deleteNotifications: (notifications, data, deleteSlice) =>
//     dispatch(
//       StartupActions.deleteNotifications(notifications, data, deleteSlice)
//     ),
// });

export default connect(mapStateToProps, null)(AllNotifications);
