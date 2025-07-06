"use client";

import React, { useState } from "react";
import styles from "./blog.module.css";
import { OperatorTableInsert } from "@/lib/type";
import { createOperator } from "../../lib";
import { ModalMessage } from "@/lib/components/index";

export function UiFormBlog() {
  const [title, setTitle] = useState("");
  const [listActivity, setListActivity] = useState<string[]>([]);
  const [paragraph, setParagraph] = useState("");
  const [titleMain, setTitleMain] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "",
  });

  const handleSubmit = async () => {
    const Body: OperatorTableInsert = {
      type_activity: 5,
      description: "",
      name: titleMain,
      indications: "",
      phone: 111111111,
      lat: 0,
      lng: 0,
      category_id: 5,
      zone_id: 6,
      blog: listActivity,
    };
    console.log(Body);
    const resp = await createOperator(Body);
    if (!resp.status) {
      setMessage({
        title: "Error",
        message: resp.error,
        buttonText: "Aceptar",
      });
      setOpenModal(true);
      setLoading(false);
      return;
    }
    setMessage({
      title: "Exito",
      message: "Blog creado correctamente",
      buttonText: "Aceptar",
    });
    setOpenModal(true);
    setLoading(false);
    setTitleMain("");
    setListActivity([]);
    setParagraph("");
    setTitle("");
  };
  return (
    <div className={styles.blog}>
      <h2>Formulario de Blog</h2>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          Titulo Principal
        </label>
        <input
          type="text"
          placeholder="Titulo"
          className={styles.input}
          value={titleMain}
          onChange={(e) => setTitleMain(e.target.value)}
        />
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="activity" className={styles.label}>
          Titulo
        </label>
        <input
          type="text"
          placeholder="Titulo"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            setListActivity([...listActivity, `#${title}`]);
            setTitle("");
          }}
          className={styles.btn_add}
        >
          Guardar
        </button>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="activity" className={styles.label}>
          Parrafo
        </label>
        <input
          type="text"
          placeholder="Parrafo"
          className={styles.input}
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
        <button
          onClick={() => {
            setListActivity([...listActivity, `~${paragraph}`]);
            setParagraph("");
          }}
          className={styles.btn_add}
        >
          Guardar
        </button>
      </div>
      <div>
        {listActivity.map((activity, index) => (
          <div key={index}>
            {activity.startsWith("#") ? (
              <h2>{activity.slice(1)}</h2>
            ) : (
              <p>{activity.slice(1)}</p>
            )}
          </div>
        ))}
      </div>
      <button className={styles.btn_submit} onClick={handleSubmit}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
      <ModalMessage
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
      />
    </div>
  );
}
