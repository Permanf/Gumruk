import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUser } from "../../store/middlewares/auth";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../Layouts/Layout";
import { User, FileUpload, FilePencil, Logout } from "tabler-icons-react";

const LayoutProfile = ({ children, title }) => {
  return (
    <>
      <Layout title={title}>
        <Center className="bg_gray">
          <div className="container_out py-10">
            <h1 className="text-xl sm:text-3xl font-semibold">
              Личный кабинет
            </h1>
            <div className="w-full flex my-10">
              <div className="w-1/4 flex flex-col bg-white p-6  rounded-md shadow-lg">
                <Link href={`/profile`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <User size={30} className="cursor-pointer mr-2" />
                    <span>Профиль</span>
                  </a>
                </Link>
                <Link href={`/profile/document`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <FileUpload size={30} className="cursor-pointer mr-2" />
                    <span>Документы</span>
                  </a>
                </Link>
                <Link href={`/profile/history`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <FilePencil size={30} className="cursor-pointer mr-2" />
                    <span>История деклораций</span>
                  </a>
                </Link>
                <hr className="my-5" />

                <div className={`font-normal my-3 text-base flex items-center`}>
                  <Logout size={30} className="cursor-pointer mr-2" />
                  <span>Выйти</span>
                </div>
              </div>
              <div className="w-3/4 bg-white h-60 ml-5 rounded-md shadow-lg">
                {children}
              </div>
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default LayoutProfile;
