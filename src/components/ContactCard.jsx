import { MdOutlineContacts } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
// import useDisclouse from "../hooks/useDisclouse";
import AddDelete from "./AddDelete";
import { toast } from "react-toastify";
import { useState } from "react";


const ContactCard = ({ contact }) => {

    // const [isOpen, onClose, onOpen] = useDisclouse();

    const [isOpen, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            toast.success("Contact deleted successfully")
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div key={ contact.id } className='bg-slate-600 flex justify-around items-center p-2 rounded-lg' >
                <div className='flex gap-4'>
                    <div className='flex items-center'>
                        <MdOutlineContacts className='text-5xl text-orange-300' />
                    </div>

                    <div className='text-white'>
                        <h2 className='font-bold'>{ contact.name }</h2>
                        <p className='text-sm'>{ contact.email } </p>
                        {/* <p className='text-sm'>{ contact.linkedin } </p>
                        <p className='text-sm'>{ contact.github } </p> */}
                        <p className='text-sm'>{ contact.number } </p>
                    </div>
                </div>
                <div className='flex gap-2 text-3xl'>
                    <TbEdit onClick={ onOpen } className='text-orange-300 cursor-pointer' />
                    <MdDelete onClick={ () => deleteContact(contact.id) } className='text-orange-300 cursor-pointer' />
                </div>
            </div>
            <AddDelete contact={ contact } isUpdate onClose={ onClose } isOpen={ isOpen } />
        </>
    );
};

export default ContactCard;