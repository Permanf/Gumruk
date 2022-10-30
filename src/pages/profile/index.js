import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LayoutProfile from "../../components/Profile/Layout";

const Settings = () => {
  return (
    <LayoutProfile title="Profile">
      <div className="p-10">
        <h1>profile</h1>
      </div>
    </LayoutProfile>
  );
};

export default Settings;
