"use client";

import React, { useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ModalMessage, UiForm } from "@/lib/components/index";
import { CategoryTableRow, OperatorTableRow } from "@/lib/type";
import { createOperator } from "../../lib";
import styles from "./ui-form-operator.module.css";
import { FaMapMarkerAlt, FaSave } from "react-icons/fa";
import { convertToWebP } from "@/lib/utils/ceonvertWebp";
import { uploadToSupabase } from "@/lib/action/load-img";

// Replace with your Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Location = {
  lat: number;
  lng: number;
};

type Props = {
  categories: CategoryTableRow[];
  operators: OperatorTableRow[];
};

export function UiFormOperator({ categories, operators }: Props) {
  const [location, setLocation] = useState<Location | null>(null);
  const [category, setCategory] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name_company, setNameCompany] = useState<string>("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [direction, setDirection] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefPhotos = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "Aceptar",
  });

  const handleMapClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setLocation({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const isExist = operators.some(
      (operator) => operator.name_company === name_company
    );
    if (isExist) {
      setMessage({
        title: "Error",
        message: "El nombre de la empresa ya existe",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      setLoading(false);
      return;
    }
    const { webpBlob, fileName } = logo
      ? await convertToWebP(logo as File)
      : { webpBlob: null, fileName: "" };
    const photosUrls: string[] = [];

    const uploadLogo = logo
      ? await uploadToSupabase({
          webpBlob: webpBlob as Blob,
          path: `logo/${name_company
            .split(" ")
            .join("_")}/${fileName}-${new Date().getTime()}`,
          mimeType: "image/webp",
        })
      : { publicUrl: "" };

    try {
      for (const blob of photos ?? []) {
        const { webpBlob, fileName } = await convertToWebP(blob);
        const uploadPhoto = await uploadToSupabase({
          webpBlob: webpBlob,
          path: `logo/${name_company
            .split(" ")
            .join("_")}/${fileName}-${new Date().getTime()}`,
          mimeType: "image/webp",
        });
        photosUrls.push(uploadPhoto.publicUrl);
      }
    } catch (error) {
      setMessage({
        title: "Error",
        message: "Error al subir las fotos",
        buttonText: "Entendido",
      });
      setModalMessage(true);
      return;
    }

    const body = {
      name: name,
      description: description,
      phone: Number(phone),
      lat: location?.lat as number,
      lng: location?.lng as number,
      type_activity: 1,
      category_id: Number(category),
      zone_id: 6,
      direction: direction,
      logo: uploadLogo.publicUrl,
      name_company: name_company,
      img: photosUrls,
    };
    try {
      const resp = await createOperator(body);
      if (resp.status) {
        setCategory(0);
        setLocation(null);
        setName("");
        setDescription("");
        setPhone("");
        setNameCompany("");
        setDirection("");
        setPhotos(null);
        setLogo(null);
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
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Nuevo Operador Turístico</h1>
        <UiForm onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre del operador</label>
              <input
                className={styles.inputField}
                placeholder="Ej: Aventuras Guavio"
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name_company">Nombre de la empresa</label>
              <input
                className={styles.inputField}
                placeholder="Ej: Aventuras Guavio"
                name="name_company"
                id="name_company"
                type="text"
                value={name_company}
                onChange={(e) => setNameCompany(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="direction">Dirección</label>
              <input
                className={styles.inputField}
                placeholder="Ej: Aventuras Guavio"
                name="direction"
                id="direction"
                type="text"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input
                className={styles.inputField}
                placeholder="Ej: 3001234567"
                name="phone"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Latitud</label>
              <input
                className={styles.inputField}
                placeholder="Ej: 4.232.."
                name="phone"
                id="phone"
                type="number"
                value={location?.lat ?? 0}
                onChange={(e) => {
                  const lat = Number(e.target.value);
                  setLocation((prev) => ({
                    lat,
                    lng: prev?.lng ?? 0,
                  }));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Longitud</label>
              <input
                className={styles.inputField}
                placeholder="Ej: -73.567.."
                name="phone"
                id="phone"
                type="number"
                value={location?.lng ?? 0}
                onChange={(e) => {
                  const lng = Number(e.target.value);
                  setLocation((prev) => ({
                    lat: prev?.lat ?? 0,
                    lng,
                  }));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="logo">Logo</label>
              <input
                ref={fileInputRef}
                className={styles.inputField}
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLogo(file);
                    // Aquí puedes manejar la subida del archivo o guardar la referencia
                  }
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="photos">Fotos del operador</label>
              <input
                ref={fileInputRefPhotos}
                className={styles.inputField}
                type="file"
                id="photos"
                name="photos"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  setPhotos(files);
                  if (files && files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                      console.log(
                        `- ${files[i].name} (${(files[i].size / 1024).toFixed(
                          2
                        )} KB)`
                      );
                    }
                    // Aquí puedes manejar la subida de múltiples archivos
                    // Por ejemplo: Array.from(files).forEach(file => uploadFile(file));
                  }
                }}
              />
              <p className={styles.helperText}>
                Puedes seleccionar múltiples imágenes manteniendo presionada la
                tecla Ctrl (Windows) o Cmd (Mac).
              </p>
            </div>

            {/* <div className={styles.inputGroup}>
            <label htmlFor="zone">Zona</label>
            <select
              className={styles.selectField}
              name="zone"
              id="zone"
              onChange={(e) => setZone(e.target.value)}
              value={zone}
            >
              <option value="">Selecciona una zona</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div> */}

            <div className={styles.inputGroup}>
              <label htmlFor="category">Categoría</label>
              <select
                className={styles.selectField}
                name="category"
                id="category"
                onChange={(e) => setCategory(Number(e.target.value))}
                value={category}
              >
                <option value="">Selecciona una categoría</option>
                {categories
                  .filter((category) => category.id !== 5)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label htmlFor="description">Descripción</label>
              <textarea
                className={styles.inputField}
                placeholder="Describe los servicios que ofrece el operador"
                name="description"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.mapSection}>
            <h2 className={styles.mapTitle}>
              <FaMapMarkerAlt /> Ubicación en el mapa
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "1rem",
                fontSize: "0.95rem",
              }}
            >
              Haz clic en el mapa para marcar la ubicación o arrastra el
              marcador para ajustarla
            </p>
            <div className={styles.mapContainer}>
              <Map
                initialViewState={{
                  longitude: -73.16851,
                  latitude: 4.82052,
                  zoom: 13,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
                reuseMaps
              >
                <NavigationControl position="top-right" showCompass={false} />

                {location && (
                  <Marker
                    longitude={location.lng}
                    latitude={location.lat}
                    draggable
                    onDragEnd={(e) => {
                      const { lng, lat } = e.lngLat;
                      if (lat && lng) {
                        setLocation({ lat, lng });
                      }
                    }}
                  >
                    <div className={styles.customMarker}>
                      <FaMapMarkerAlt color="#EF4444" size={32} />
                    </div>
                  </Marker>
                )}
              </Map>
            </div>
            {location && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#4b5563",
                }}
              >
                Ubicación seleccionada: Lat: {location.lat.toFixed(6)}, Lng:{" "}
                {location.lng.toFixed(6)}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading ? (
              "Cargando..."
            ) : (
              <>
                <FaSave style={{ marginRight: "8px" }} />
                Guardar Operador
              </>
            )}
          </button>
        </UiForm>
      </div>
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
      />
    </>
  );
}
