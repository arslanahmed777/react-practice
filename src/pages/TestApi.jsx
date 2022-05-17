import React, { Component } from "react";
import API from "../components/api/API";

export default class TestApi extends Component {
  render() {
    return (
      <div>
        <API FolderPath="C:\inetpub\wwwroot\NewDesignBackend\Resources\3\CategoryOne\30_September_2021_09_27_26_b8f9b691-fa83-4902-bf28-0c635e86fd29" />
      </div>
    );
  }
}
