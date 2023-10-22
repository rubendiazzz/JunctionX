import face_recognition
import cv2

def blur_faces(image_path, output_path):
    # Cargar la imagen con face_recognition
    image = face_recognition.load_image_file(image_path)

    # Detectar todas las caras en la imagen
    face_locations = face_recognition.face_locations(image)

    # Convertir la imagen a un formato que opencv pueda manejar
    img = cv2.imread(image_path)

    # Difuminar cada cara detectada
    for face_location in face_locations:
        top, right, bottom, left = face_location
        face = img[top:bottom, left:right]
        img[top:bottom, left:right] = cv2.GaussianBlur(face, (99, 99), 30)

    # Guardar la imagen con las caras difuminadas
    cv2.imwrite(output_path, img)

# Usar la función
blur_faces('ruta_de_tu_imagen.jpg', 'ruta_de_salida_difuminada.jpg')
