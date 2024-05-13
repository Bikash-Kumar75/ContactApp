import './App.css';
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import AddDelete from './components/AddDelete';
// import useDisclouse from './hooks/useDisclouse';
import ContactCard from './components/ContactCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

const App = () => {
  const [contacts, setContacts] = useState([]);

  // const { isOpen, onClose, onOpen } = useDisclouse();
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    const getContacts = async () => {

      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      }
      catch (error) {

        console.log(error);
      }

    };

    getContacts();
  }, []);


  // Search function

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");


    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().include(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  }




  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='flex relative items-center flex-grow'>
            <FiSearch className='text-white text-3xl absolute ml-1' />
            <input onChange={ filterContacts } type="text" className='text-white pl-9 flex-grow bg-transparent border border-white rounded-md h-10' />
          </div>

          <div>
            <IoIosAddCircle onClick={ onOpen } className='text-white text-5xl cursor-pointer' />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          { contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={ contact.id } contact={ contact } />
            ))
          ) }
        </div>
      </div>
      <AddDelete onClose={ onClose } isOpen={ isOpen } />
      <ToastContainer position="bottom-center" autoClose={ 4000 } />

    </>
  )
}


export default App;
