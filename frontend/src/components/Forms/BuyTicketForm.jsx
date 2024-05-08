import React, {useEffect, useState} from 'react';
import {Button, Modal} from "flowbite-react";
import ChooseTicket from "../Steps/ChooseTicket";
import SubmitTickets from "../Steps/SubmitTickets";
import Payment from "../Steps/Payment";
import Finish from "../Steps/Finish";

const stepsArray = ['A', 'B', 'C', 'D'];
const BuyTicketForm = ({openModal, handleModal, concertInfo}) => {
    const [tickets, setTickets] = useState([]);
    const [step, setStep] = useState(stepsArray[0]);
    const [concert, setConcert] = useState(concertInfo);
    const [buyTicket, setBuyTicket] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userInfo")))
    }, []);

    const handleClearCart = () => {
        setTickets([])
        setStep(stepsArray[0])
    }
    const handleNextStep = () => {
        if (step === 'A') setStep('B');
        else if (step === 'B') setStep('C');
        else if (step === 'C') setStep('D');
    };

    const handlePrevStep = () => {
        if (step === 'D') setStep('C');
        else if (step === 'C') setStep('B');
        else if (step === 'B') setStep('A');
    };
    console.log(buyTicket);
    return (
        <Modal show={openModal} onClose={() => handleModal(false)}>
            <Modal.Header>Покупка билета</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {step === stepsArray[0] ? (
                        <ChooseTicket concert={concertInfo} tickets={tickets} setTickets={setTickets}/>
                    ) : null}
                    {step === stepsArray[1] ? (
                        <SubmitTickets tickets={tickets} clearCart={handleClearCart} goBack={handlePrevStep}/>
                    ) : null}
                    {step === stepsArray[2] ?? tickets ? (
                        <Payment user={user} tickets={tickets} concertId={concertInfo.id} goNext={handleNextStep} setBuyTicket={setBuyTicket}/>
                    ) : null}
                    {step === stepsArray[3] ? (
                        <Finish tickets={buyTicket} concert={concertInfo}/>
                    ) : null}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {step === stepsArray[0] || step === stepsArray[1] ? (
                    <div className="flex flex-wrap items-center justify-center space-between">
                        <Button color="gray" onClick={handlePrevStep}>
                            Назад
                        </Button>
                        <Button color="gray" onClick={handleNextStep}>
                            Далее
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center justify-center space-between">
                        <Button color="gray" onClick={() => {
                            handleModal();
                            setStep(stepsArray[0]);
                            handleClearCart();
                        }}>
                            Выйти
                        </Button>
                    </div>
                )}
                <div className="flex flex-wrap items-center justify-center space-x-4 space-y-7">
                    {step === stepsArray[0] ? (
                        <p className="text-gray-500 dark:text-gray-400 space-y-14">
                            Выбранные билеты: {tickets.map(ticket => (
                            <a>{ticket.zone} {ticket.placeNum}, </a>
                        ))}
                        </p>
                    ) : null}
                </div>
            </Modal.Footer>
        </Modal>
    )
        ;
};

export default BuyTicketForm;