import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space } from "antd";
import {  useState } from "react";
import {  } from "../API/data";
import Profile from "../images/download.jpeg";



const NavHeader = () => {

    const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
    const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);



    return (
        <div className="flex flex-row bg-white fixed   justify-evenly w-full p-2 ">
        <h1 className="text-xl mt-2 font-bold">Guantai Dashboad</h1>
        <div className="ml-12 ">
          <Space>
            <Badge className="ml-2" 
            >
              <MailOutlined
                style={{ fontSize: 24 }}
                onClick={() => {
                  setCommentsOpen(true);
                }}
              />
            </Badge>
            <Badge className="ml-2" 
         
            >
              <BellFilled
                style={{ fontSize: 24 }}
                onClick={() => {
                   setNotificationsOpen(true);
                }}
              />
            </Badge>
            <Image className="ml-2" width={40} src={Profile} ></Image>
          </Space>
        </div>
  
        <Drawer
          title="Comments"
          open={commentsOpen}
          onClose={() => {
            setCommentsOpen(false);
          }}
          maskClosable
        >
          <List
         //Data will be fetched from the API
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          open={notificationsOpen}
          onClose={() => {
            setNotificationsOpen(false);
          }}
          maskClosable
        >
          <List
         //Data will be fetched from the API
          ></List>
        </Drawer>
      </div>
    );
  }
  export default NavHeader;
  