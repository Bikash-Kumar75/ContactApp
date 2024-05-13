import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";


// validation function
const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    number: Yup.number().required("Number is required"),
});


// Add and Update function
const AddDelete = ({ isOpen, onClose, isUpdate, contact }) => {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact added successfully")
        } catch (error) {
            console.log(error);
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact updated successfully")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Modal isOpen={ isOpen } onClose={ onClose }>
                <Formik
                    validationSchema={ contactSchemaValidation }
                    initialValues={ isUpdate
                        ? {
                            name: contact.name,
                            email: contact.email,
                            number: contact.number,
                        } :
                        {
                            name: "",
                            email: "",
                            number: "",
                        }
                    }
                    onSubmit={ (values) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contact.id) :
                            addContact(values);
                    } }
                >
                    <Form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <Field name="name" className="h-10 border pl-2" />
                        </div>
                        <div className="text-red-500 text-xs">
                            <ErrorMessage name="name" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <Field name="email" className="h-10 border pl-2" />
                        </div>
                        <div className="text-red-500 text-xs">
                            <ErrorMessage name="email" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="number">Number</label>
                            <Field name="number" className="h-10 border pl-2" />
                        </div>
                        <div className="text-red-500 text-xs">
                            <ErrorMessage name="number" />
                        </div>

                        <button className="bg-orange-500 px-3 py-1.5 mt-2 border self-center">{ isUpdate ? "Update" : "Add" } Contact</button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddDelete;
