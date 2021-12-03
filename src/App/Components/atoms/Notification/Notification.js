import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import StartupActions from "../../../Stores/Startup/Actions";
import { BellIcon } from "../Icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Notification = (props) => {
  const history = useHistory();
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, setIsNotificationsMenuOpen, isNotificationsMenuOpen);

  let dataOBJ = {
    page: 0,
    size: 50,
  };

  const [data, setData] = useState(dataOBJ);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  const navigateToNotifications = () => {
    setIsNotificationsMenuOpen(false);
    history.push("/all-notifications");
  };

  function useOnClickOutside(ref, handler, isOpen) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(isOpen);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", (message) => {
      props.setNotificationCount();
      props.newNotifications(data);
      store.addNotification({
        title: "New notification",
        message: message.data['firebase-messaging-msg-data'].notification.body,
        type: "info", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    });
    
    props.newNotifications(data);
  }, []);

  useEffect(() => {
    if (!isNotificationsMenuOpen) {
      // props.deleteNotifications(props.notificationsList, data, [0, 5]);
    } else {
      props.newNotifications(data);
      props.clearNotificationCount();
    }
  }, [isNotificationsMenuOpen]);

  return (
    <li className="relative" ref={ref}>
      <button
        className="relative rounded-md focus:outline-none focus:shadow-outline-purple"
        onClick={handleNotificationsClick}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <BellIcon className="w-5 h-5" aria-hidden="true" />
        {/* <!-- Notification badge --> */}
        {props.count > 0 && (
          <div class="absolute bottom-0 shadow-md right-0 mr-0 mb-4 bg-white rounded">
            <p class="absolute bg-red-600 justify-center rounded-full px-1 mr-4 text-white text-xs">
              {props.count}
            </p>
          </div>
        )}
      </button>

      {isNotificationsMenuOpen && (
        <div
          class="absolute right-0 mt-2 rounded-b-md shadow-lg overflow-hidden z-20 bg-gray-200"
          style={{ width: "20rem" }}
        >
          {props.notificationsList.notifications.length > 0 ? (
            <>
              <div>
                {props.notificationsList.notifications
                  .slice(0, 5)
                  .map((notification, key) => (
                    <a
                      key={key}
                      href="#"
                      class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2 shadow-xs"
                    >
                      {/* <img
                        class="h-8 w-8 rounded-full object-cover mx-1"
                        src={notification.imageUrl}
                      /> */}
                      <FontAwesomeIcon icon={faTag} size="lg" className="text-red-500 mx-2" />
                      <p class="text-sm mx-2 flex flex-col w-full text-black">
                        <span class="font-bold" href="#">
                          {notification.title}
                        </span>{" "}
                        <span href="#">
                          {notification.body}
                        </span>
                      </p>
                    </a>
                  ))}
              </div>
              <a
                style={{ cursor: "pointer" }}
                onClick={navigateToNotifications}
                class="block bg-gray-800 text-white text-center font-bold py-2"
              >
                View all notifications
              </a>
            </>
          ) : (
            <>No new notificaitons</>
          )}
        </div>
      )}
    </li>
  );
};

const mapStateToProps = ({
  startup: { notificationCount, newNotifications },
}) => ({ count: notificationCount, notificationsList: newNotifications });

const mapDispatchToProps = (dispatch) => ({
  setNotificationCount: () => dispatch(StartupActions.setNotificationCount()),
  clearNotificationCount: () =>
    dispatch(StartupActions.clearNotificationCount()),
  newNotifications: (data) =>
    dispatch(StartupActions.getNewNotifications(data)),
  deleteNotifications: (notifications, data, deleteSlice) =>
    dispatch(
      StartupActions.deleteNotifications(notifications, data, deleteSlice)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
