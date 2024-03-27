import React from 'react'

export default function SidebarA() {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const [children, setChildren] = useState(false);
    const showChildren = () => setChildren(!children);
  
    const menuItem = [
      {
        path: "/",
        name: "Dashboard",
        icon: <RxDashboard />
      },
      {
        name: "Parts Category",
        icon: <BiSolidCategory />,
        iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px",fontSize:"19px" }}  />,
        iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" ,fontSize:"19px"}}  />,
        childrens: [
          {
            path: "/partscategory/usedparts",
            name: "Used Parts",
            icon: <BiSolidCategory />
          },
          {
            path: "/partscategory/unusedparts",
            name: "Unused Parts",
            icon: <BiSolidCategory />
          }
        ]
      },
      {
        path: "/myorders",
        name: "My Orders",
        icon: <LuClipboardCheck />
      },
      {
        path: "/myprofile",
        name: "MyProfile",
        icon: <CgProfile />
      },
      {
        path: "/offerstatus",
        name: "Offer Status",
        icon: <IoMdToday />
      },
      {
        path: "/askme",
        name: "Ask Me",
        icon: <BsFillQuestionCircleFill />
      }
    ]
    return (
  
      <div style={{ width: isOpen ? "20%" : "5%" }} className="sidebar">
        <div className="top_section">
          <h2 style={{ display: isOpen ? "block" : "none" }} className="logo">Moto Parts</h2>
          <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} onClick={item.childrens && showChildren} className={item.name !== 'Parts Category' ? "link" : "link_partscategory"} activClassName="active">
              <div className="main_menue ">
                <div className="col-2">
                  <div style={{ fontSize: isOpen ? "17px" : "20px" }} className={item.name !== 'Parts Category' ? "icon" : "parts_icon"} >{item.icon}</div>
                </div>
                <div className="col-8">
                  <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className={item.name !== 'Parts Category' ? "link_text" : "parts_icon"}>{item.name}</div>
                </div>
                <div className="col-1">
                  <div >{item.childrens && children ? item.iconOpened : item.childrens ? item.iconClosed : null}</div>
                </div>
              </div>
              <div className="sub_menue">
                {children && item.childrens && item.childrens.length > 0 && item.childrens.map((childItem, childIndex) => (
                  <NavLink to={childItem.path} key={childIndex} className="child_link " activClassName="active" >
                    <div className="row d-flex justify-content-evenly ">
                      <div className="col-1">
                        <div className={item.name !== 'Parts Category' ? "icon" : "partsSub_icon"}>{childItem.icon}</div>
                      </div>
                      <div className='col-8'>
                        <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className="link_text">{childItem.name}</div>
                      </div>
                    </div>
                  </NavLink>
                ))
                }
              </div>
            </NavLink>
  
          )
          )
        }
  
      </div>
  
    )
}
