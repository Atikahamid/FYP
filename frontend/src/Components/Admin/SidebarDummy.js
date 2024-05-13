import React, { useState } from 'react';
import '../../Styles/App.css'
import { MdOutlineCategory,MdFreeCancellation, MdManageAccounts,MdOutlinePlaylistAddCheck,MdPendingActions } from "react-icons/md";
import { TbMenuOrder,TbDeviceTabletCancel } from "react-icons/tb";
import { BsFillLayersFill ,BsJournalCheck,BsFillPersonCheckFill,BsFillPersonLinesFill} from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { BiSitemap } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
// import { FaBars } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiArrowUpSFill, RiArrowDownSFill, RiPassPendingLine} from "react-icons/ri";

export default function SidebarDummy({isSidebarOpen}) {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState({});
    // const [children, setChildren] = useState(false);
    // const showChildren = () => setChildren(!children);
   
    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };

    const toggleMenu = (menuName) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [menuName]: !prevState[menuName]
        }));
    };

    const menuItem = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <RxDashboard />
        },
        {
            path: "/admin/categorymanagement",
            name: "Category ",
            icon: <MdOutlineCategory />
        },
        {
            name: "Products",
            icon: <BiSitemap />,
            childrens: [
                {
                    path: "/admin/productsmanagement/currentproducts",
                    name: "Current Products",
                    icon: <BsFillLayersFill />
                },
                {
                    path: "/admin/productsmanagement/soldproducts",
                    name: "Sold Products",
                    icon:<BsJournalCheck />
                }
            ]
        },
        {
            name: "Account ",
            icon: <MdManageAccounts />,
            // iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            // iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            childrens: [
                {
                    path: "/admin/accountmanagement/userlist",
                    name: "User List",
                    icon: <BsFillPersonLinesFill />
                },
                {
                    path: "/admin/accountmanagement/vendorlist",
                    name: "Vendor List",
                    icon: <BsFillPersonCheckFill />
                }
            ]
        },
        {
            name: "Offers ",
            icon: <MdOutlinePlaylistAddCheck />,
            // iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            // iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            childrens: [
                {
                    path: "/admin/offermanagement/pendingoffers",
                    name: "Pending Offers",
                    icon: <MdPendingActions />
                },
                {
                    path: "/admin/offermanagement/acceptedoffers",
                    name: "Accepted Offers",
                    icon: <CiBoxList />
                },
                {
                    path: "/admin/offermanagement/rejectedoffers",
                    name: "Rejected Offers",
                    icon:<TbDeviceTabletCancel />
                }
            ]
        },
        {
            name: "Orders ",
            icon:<TbMenuOrder />,
            // iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            // iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
            childrens: [
                {
                    path: "/admin/ordermanagement/completedorders",
                    name: "Completed Orders",
                    icon: <GrCompliance />
                },
                {
                    path: "/admin/ordermanagement/pendingorders",
                    name: "Pending Orders",
                    icon: <RiPassPendingLine />

                },
                {
                    path: "/admin/ordermanagement/cancelledorders",
                    name: "Cancelled Orders",
                    icon:<MdFreeCancellation />
                }
            ]
        }
        // other menu items...
    ];

    return (
        <div className="sidebar" style={{ width: isSidebarOpen ? "20%" : "5%" }}>
            <div className="top_section">
                <h2 className="logo" style={{ display: isSidebarOpen ? "block" : "none" }}>Moto Parts</h2>
                <div className="bars" style={{ marginLeft: isSidebarOpen ? "30px" : "0px" }}>
                    {/* <FaBars onClick={toggleSidebar} /> */}
                </div>
            </div>
            <div className="inner_sidebar mb-5">
                <div className="inside_sidebar">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className={!item.childrens ? "link" : "link_partscategory"}>
                            <div className="main_menue" onClick={() => toggleMenu(item.name.toLowerCase())}>
                                <div className="col-2">
                                    <div style={{ fontSize: isSidebarOpen ? "17px" : "20px" }} className={!item.childrens ? "icon" : "parts_icon"}>{item.icon}</div>
                                </div>
                                <div className="col-8">
                                    <div style={{ display: isSidebarOpen ? "block" : "none", "paddingTop": "5px" }} className={!item.childrens ? "link_text" : "parts_icon"}>{item.name}</div>
                                </div>
                                <div className="col-1">
                                    {item.childrens && (openMenus[item.name.toLowerCase()] ? <RiArrowUpSFill style={{ display: isSidebarOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} /> : <RiArrowDownSFill style={{ display: isSidebarOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />)}
                                </div>
                            </div>
                            {item.childrens && openMenus[item.name.toLowerCase()] && (
                                <div className="sub_menue">
                                    {item.childrens.map((childItem, childIndex) => (
                                        <NavLink to={childItem.path} key={childIndex} className="child_link">
                                            < div className="row d-flex justify-content-evenly ">
                                                <div className="col-1">
                                                    <div className={!item.childrens ? "icon" : "partsSub_icon"}>{childItem.icon}</div>
                                                </div>
                                                <div className="col-8">
                                                    <div style={{ display: isSidebarOpen ? "block" : "none", "paddingTop": "5px" }} className="link_text">{childItem.name}</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </NavLink>
                    ))
                    }
                </div>
            </div>
        </div >
    );
}
