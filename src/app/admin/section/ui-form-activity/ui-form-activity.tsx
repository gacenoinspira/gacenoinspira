"use client";

import React, { useRef, useState } from "react";
import styles from "./activity.module.css";
import { Delete } from "@/lib/icons/delete";
import { OperatorTableInsert, ZoneTableRow } from "@/lib/type";
import { convertToWebP } from "@/lib/utils/ceonvertWebp";
import { uploadToSupabase } from "@/lib/action/load-img";
import { ModalMessage } from "@/lib/components/index";
import { createOperator } from "../../lib";

interface Props {
  zones: ZoneTableRow[];
}

export function UiFormActivity({ zones }: Props) {
  const [title, setTitle] = useState("");
  const [howToGet, setHowToGet] = useState("");
  const [activity, setActivity] = useState("");
  const [listActivity, setListActivity] = useState<string[]>([]);
  const [rules, setRules] = useState("");
  const [listRules, setListRules] = useState<string[]>([]);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagesList, setImagesList] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState<2 | 4>(2);
  const [zone_id, setZone_id] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "Aceptar",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefPhotos = useRef<HTMLInputElement>(null);

  const validations = (): boolean => {
    if (title === "") {
      setMessage({
        title: "Error",
        message: "Debe ingresar un titulo",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (howToGet === "") {
      setMessage({
        title: "Error",
        message: "Debe ingresar como llegar",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (listActivity.length === 0) {
      setMessage({
        title: "Error",
        message: "Debe ingresar una actividad",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (listRules.length === 0) {
      setMessage({
        title: "Error",
        message: "Debe ingresar reglas",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (image === undefined) {
      setMessage({
        title: "Error",
        message: "Debe ingresar una imagen",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (imagesList.length === 0) {
      setMessage({
        title: "Error",
        message: "Debe ingresar al menos una foto",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (description === "") {
      setMessage({
        title: "Error",
        message: "Debe ingresar una descripcion",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    if (zone_id === 0) {
      setMessage({
        title: "Error",
        message: "Debe seleccionar un poblado",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validations()) return;
    setLoading(true);
    const { webpBlob, fileName } = image
      ? await convertToWebP(image as File)
      : { webpBlob: null, fileName: "" };
    const photosUrls: string[] = [];

    const uploadLogo = image
      ? await uploadToSupabase({
          webpBlob: webpBlob as Blob,
          path: `logo/${title
            .split(" ")
            .join("_")}/${fileName}-${new Date().getTime()}`,
          mimeType: "image/webp",
        })
      : { publicUrl: "" };

    try {
      for (const blob of imagesList ?? []) {
        const { webpBlob, fileName } = await convertToWebP(blob);
        const uploadPhoto = await uploadToSupabase({
          webpBlob: webpBlob,
          path: `logo/${title
            .split(" ")
            .join("_")}/${fileName}-${new Date().getTime()}`,
          mimeType: "image/webp",
        });
        photosUrls.push(uploadPhoto.publicUrl);
      }
    } catch (error) {
      console.log("Error al subir las fotos []", error);
      setMessage({
        title: "Error",
        message: "Error al subir las fotos",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return;
    }

    const Body: OperatorTableInsert = {
      type_activity: activeTab,
      description: description,
      name: title,
      indications: howToGet,
      phone: 111111111,
      lat: 0,
      lng: 0,
      rules: listRules,
      activity: listActivity,
      logo: uploadLogo.publicUrl,
      img: photosUrls,
      category_id: 5,
      zone_id: zone_id,
    };

    try {
      const resp = await createOperator(Body);
      if (resp.status) {
        setTitle("");
        setListActivity([]);
        setListRules([]);
        setImagesList([]);
        setImage(undefined);
        if (fileInputRef?.current) {
          fileInputRef.current.value = "";
        }
        if (fileInputRefPhotos?.current) {
          fileInputRefPhotos.current.value = "";
        }
      }

      setMessage({
        title: "Operador creado",
        message: "Operador creado exitosamente",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    } catch (error) {
      console.log("Error al crear el operador", error);
      setMessage({
        title: "Error",
        message: "Error al crear el operador",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    }
    setLoading(false);
  };

  return (
    <div className={styles.activity}>
      <div className={styles.contentTab}>
        <button
          className={`${styles.buttonTab} ${
            activeTab === 4 ? styles.active : ""
          }`}
          onClick={() => setActiveTab(4)}
        >
          Actividades
        </button>
        <button
          className={`${styles.buttonTab} ${
            activeTab === 2 ? styles.active : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          Poblados
        </button>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          Seleccione el poblado
        </label>
        <select
          id="title"
          className={styles.input}
          value={zone_id}
          onChange={(e) => setZone_id(Number(e.target.value))}
        >
          <option value="">Seleccione el poblado</option>
          {zones
            .filter((zone) => zone.id !== 6)
            .map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          Titulo
        </label>
        <input
          type="text"
          placeholder="Titulo"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="description" className={styles.label}>
          Descripción
        </label>
        <textarea
          placeholder="Descripción"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="howToGet" className={styles.label}>
          ¿Como Llegar?
        </label>
        <textarea
          placeholder="¿Como Llegar?"
          className={styles.input}
          value={howToGet}
          onChange={(e) => setHowToGet(e.target.value)}
        />
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="activity" className={styles.label}>
          Actividad
        </label>
        <input
          type="text"
          placeholder="Actividad"
          className={styles.input}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button
          onClick={() => {
            setListActivity([...listActivity, activity]);
            setActivity("");
          }}
          className={styles.btn_add}
        >
          Guardar
        </button>
        <h4>Lista de actividades agregadas</h4>
        <ul className={styles.ul}>
          {listActivity.map((activity, index) => (
            <li
              key={index}
              onClick={() =>
                setListActivity(listActivity.filter((_, i) => i !== index))
              }
            >
              <span className={styles.li}>
                {activity}
                <Delete className={styles.delete} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="rules" className={styles.label}>
          Reglas
        </label>
        <input
          type="text"
          placeholder="Reglas"
          className={styles.input}
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />
        <button
          onClick={() => {
            setListRules([...listRules, rules]);
            setRules("");
          }}
          className={styles.btn_add}
        >
          Guardar
        </button>
        <h4>Lista de reglas agregadas</h4>
        <ul className={styles.ul}>
          {listRules.map((rule, index) => (
            <li
              key={index}
              onClick={() =>
                setListRules(listRules.filter((_, i) => i !== index))
              }
            >
              <span className={styles.li}>
                {rule}
                <Delete className={styles.delete} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          foto principal
        </label>
        <input
          ref={fileInputRef}
          type="file"
          placeholder="Titulo"
          className={styles.input}
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0])}
        />
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          fotos
        </label>
        <input
          ref={fileInputRefPhotos}
          type="file"
          placeholder="Titulo"
          className={styles.input}
          accept="image/*"
          onChange={(e) => {
            if (!e.target.files) return;
            setImagesList((prev) => [...prev, e.target.files![0]]);
          }}
        />
        <ul className={styles.ul}>
          {imagesList.map((image, index) => (
            <li
              key={index}
              onClick={() =>
                setImagesList(imagesList.filter((_, i) => i !== index))
              }
            >
              <span className={styles.li}>
                {image.name}
                <Delete className={styles.delete} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.btn_submit} onClick={onSubmit}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
      />
    </div>
  );
}
