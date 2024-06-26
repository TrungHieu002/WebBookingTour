import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Outlet } from "react-router-dom";
import { Divider, FloatButton, Popover } from "antd";
import { MessageTwoTone } from "@ant-design/icons";
import { useState } from "react";
import Chatbot from "./components/shared/Chatbot";
function App() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="container">
        <div className="container__body">
          <div className="row fix-height">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>

      <Popover
        content={<Chatbot />}
        title={<><div className="chatbot__title">Hỗ trợ 24/7</div><Divider style={{ margin: "12px 0px 12px 0px" }} /></>}
        trigger="click"
        open={open}
        placement="leftTop"
        onOpenChange={handleOpenChange}
      >
        <FloatButton
          shape="circle"
          type="primary"
          badge={{ count: 1 }}
          tooltip={<div>Chat Bot</div>}
          style={{ right: 20, bottom: 50 }}
          icon={<MessageTwoTone />}
        />
      </Popover>

    </>
  );
}

export default App;
