import "./tickets.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { readTicketsThunk } from "../../store/tickets";
import SingleTicket from "../SingleTicket";
import AddTicketModal from "../AddTicketModal";
import EditTicketModal from "../EditTicketModal";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";

function Tickets() {
    const dispatch = useDispatch();
    const { departmentId } = useParams()
    const tickets = useSelector((state) => state.tickets);
    const dept = useSelector((state) => state.singleDepartment);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(readTicketsThunk(departmentId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getSingleDepartmentThunk(departmentId))
    }, [])

    return (
        <>
            <h1 className="deptName">{dept.name}</h1>
            <div className="ticketList">
                <div className="ticketTitles">
                    <div className="ticketTitles">
                        <div className="nameTitle">Item Name</div>
                        <div className="locationTitle">Location</div>
                        <div className="descriptionTitle">Description</div>
                    </div>
                    <div className="editTitle"></div>
                </div>
                {tickets && tickets.map(ticket => {
                    return (
                        <div className="singleTicketContainer" key={ticket.id} >
                            <SingleTicket
                                departmentId={departmentId}
                                ticketId={ticket.id}
                                itemName={ticket.item_name}
                                location={ticket.location}
                                description={ticket.description}
                                departmentId={ticket.department_id}
                                setIsEditOpen={setIsEditOpen}
                                setEditId={setEditId}
                                ownerId={ticket.owner_id}
                            />
                        </div>
                    )
                })}
            </div>
            {!tickets.length &&
                <div className="noTickets">Currently there are no tickets for this department. Add one below!</div>
            }
            <div className="addItHereContainer">
                <button className='primaryBtn' onClick={() => setIsOpen(true)}>
                    Add a Ticket
                </button>
            </div>
            {isOpen && <AddTicketModal setIsOpen={setIsOpen} />}
            {isEditOpen && <EditTicketModal editId={editId} setIsOpen={setIsEditOpen} />}
        </>
    );
}

export default Tickets;
