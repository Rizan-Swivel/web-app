import React from "react";

import { Card } from "../Components/atoms/Card";

import { connect } from "react-redux";

import StartupActions from "../Stores/Startup/Actions";

import ReactPlayer from "react-player";

function User(props) {
  return (
    <div>
      <Card type="primary" size="half">
        <ReactPlayer
          width="100%"
          playing={false}
          controls
          url="https://fw-assets-uploads.nyc3.digitaloceanspaces.com/banner.mp4"
        />
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(User);
