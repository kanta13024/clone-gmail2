import React from "react";
import "../assets/css/SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { db } from "../firebase";
import firebase from "firebase";

function SendMail() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData.To);
    db.collection("emails").add({
      to: formData.To,
      subject: formData.Subject,
      message: formData.Message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon onClick={() => dispatch(closeSendMessage())} className="sendMail__close" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="to" placeholder="To" type="email" {...register("To", { required: true })} />
        {errors.To?.type === "required" && <p className="sendMail__error">送信先は必須です</p>}

        <input
          name="subject"
          placeholder="subject"
          type="text"
          {...register("Subject", { required: true })}
        />
        {errors.Subject?.type === "required" && (
          <p className="sendMail__error">タイトルは必須です</p>
        )}

        <input
          name="message"
          placeholder="Message..."
          type="text"
          className="sendMail__message"
          {...register("Message", { required: true })}
        />
        {errors.Message?.type === "required" && (
          <p className="sendMail__error">メッセージは必須です</p>
        )}

        <div className="sendMail__options">
          <Button className="sendMail__send" variant="contained" color="primary" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
