# Nodejs Backend + Reactjs Frontend CRUD

## Installation or Run Locally

```bash
 1. Folder create for project
 2. Folder open any text editor
 3. Open tarminal

```

```bash
Backend (NodeJS)
 4. git clone -b frontend cloneUrl
 5. Created folder name change for backend
 6. Open tarminal
 7. cd changeFolderName
 8. npm install
 9. npm run start
```

```bash
Frontend (ReactJS)
 4. git clone -b frontend cloneUrl
 5. Created folder name change for frontend
 6. Open tarminal
 7. cd changeFolderName
 8. npm install
 9. npm run dev
```

## Apis Use For Frontend

```bash
/students


    res.status(200).json({
    studentDB,
    status: "success",
    message: "Add successfully",
    });
```

```bash
/studentAdd
body : {processProfilePictureBase64Url, name, roll};

    res.status(200).json({
    studentDB,
    status: "success",
    message: "Add successfully",
    });
```

```bash
/studentUpdate/:id
body : {processProfilePictureBase64Url, name, roll};

    res.status(200).json({
        studentDB,
        message: "Update successfully",
        status: "success",
    });
```

```bash
/studentDelete/:id

    res.status(200).json({
        studentDB,
        status: "success",
        message: "Delete successfully"
    });

```

## Deployment

- [How to node project deploy](https://youtu.be/gDxxv5GZc_s?si=XoNbotLhnTH8SUls)

```bash
  Frontend deploy (ReactJS)

    npm run build
    build folder create zip
    zip folder upload and unzip
```

## Help

- [Youtube](https://www.youtube.com/@sanjoy-roy)

## Features

- Student Create, Read, Update, Delete
- Profile Picture, Name, Roll
- Student search

## Used By

This project is used :

- Gangarampur Girls High School

### Authors

- [SanjoyRoy](https://github.com/sanjoy-git)
- [Youtube](https://www.youtube.com/@sanjoy-roy)
