import React, {useContext, useState} from "react";
import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import {AuthContext} from "../../shared/context/auth-context";

const PlaceItem = (props) => {
    const auth=useContext(AuthContext)
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () =>{
        setShowMap(true);
    }
    const closeMapHandler = () => setShowMap(false);

    const showDeletWarningHandler=()=>{
        setShowConfirmModal(true)
    };
    const cancelDeleteHandler=()=>{
        setShowConfirmModal(false)
    };

    const confirmDeleteHandler=()=>{
        setShowConfirmModal(false)
        console.log("DELETE...")
    }

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
               <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
           <Modal
               show={showConfirmModal}
               onCancel={cancelDeleteHandler}
               header={"Are you sure?"} footerClass={"place-item__modal-actions"} footer={
               <>
                <Button onClick={cancelDeleteHandler} inverse>
                   CANCEL
                </Button>
                   <Button onClick={confirmDeleteHandler} danger>
                   DELETE
                </Button>
               </>
           }>
               <p>Do you to proceed and delete this place? Please note that it
               can't be undone thereafter.
               </p>
           </Modal>
            <li>
                <Card className={"place-item__content"}>

                    <div className={"place-item"}>
                        <div className={"place-item__image"}>
                            <img src={props.image} alt={props.title}/>
                        </div>
                        <div className={"place-item__info"}>
                            <h2>{props.title}</h2>
                            <h3>{props.address}</h3>
                        </div>
                    </div>
                    <div className={"place-item__actions"}>
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.isLoggedIn && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
                        {auth.isLoggedIn && (<Button onClick={showDeletWarningHandler} danger>DELETE</Button>)}
                    </div>
                </Card>

            </li>
        </>

    )
}
export default PlaceItem;