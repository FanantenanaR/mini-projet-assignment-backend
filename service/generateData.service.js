const {insertStudent, getStudents} = require("./student.service");
const { faker } = require('@faker-js/faker');
const {insertProf, getAllProf} = require("./prof.service");

const studentList = require("../data/student.json");
const profList = require("../data/prof.json");
const subjectList = require("../data/subject.json");


const Prof = require("../model/prof.model");
const Student = require("../model/student.model");
const Subject = require("../model/subject.model");
const AssignmentProf = require("../model/assignmentProf.model");
const {getAllSubject} = require("./subject.service");
const {insertProfAssignment, getAllProfAssignment} = require("./assignmentProf.service");
const AssignmentStudent = require("../model/assignmentStudent.model");
const {insertStudentAssignment} = require("./assignmentStudent.service");

const generateStudent = async () => {
    // ajout des deux membres du groupe de ce projet
    const nombreDeleted = await Student.deleteMany({});
    console.log(nombreDeleted);

    let counter = 0;
    for (let indice = 0; indice < studentList.data.length; indice++) {
        const student = studentList.data[indice];
        const studentA = await insertStudent(
            student.firstname,
            student.lastname,
            student.email,
            student.password,
            student.profilPicture
        );
        if (studentA) counter+= 1;

    }

    const envNumber = process.env.NUMBER_STUDENT;
    const numberStudent = envNumber ? parseInt(envNumber) : 61;

    // generate n student
    for (let studentNumber = 1; studentNumber < numberStudent; studentNumber++) {
        const sex = studentNumber % 2 === 0 ? 'female' : 'male';
        const femalePic = process.env.PROFILE_FEMALE ?? "https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg";
        const malePic = process.env.PROFILE_MALE ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgU_co2N_FHz2xM78QfRdG4vn_pwudygLk7Q&s";
        const studentResult = await insertStudent(
            faker.person.firstName(sex),
            faker.person.lastName(sex),
            `student${studentNumber}@gmail.com`,
            "password24",
            sex === 'female' ? femalePic : malePic
        );
        if (studentResult) counter += 1;
    }
    return counter;

}

const generateProf = async () => {
    // suppression des existants
    const deleteProf = await Prof.deleteMany({});
    console.log("prof deleted", deleteProf);

    let counter = 0;
    console.log(profList.data[0]);
    for (let indice = 0; indice < profList.data.length; indice ++) {
        const prof = profList.data[indice];
        const dataProf = {
            _id: prof._id,
            firstname: prof.firstname,
            lastname: prof.lastname,
            email: prof.email,
            password: prof.password,
            profilPicture: prof.profilPicture,
            isAdmin: prof.isAdmin
        };
        console.log(dataProf)
        const result = await Prof.create(dataProf);
        if (result) counter += 1;
    }
    return counter;

}

const generateSubject = async () => {
    // TODO implement generator
    // generate 10 subjects
    const deleteSubject = await Subject.deleteMany({});
    console.log("deleted subject", deleteSubject);

    let counter = 0;
    console.log(profList.data[0]);
    for (let indice = 0; indice < subjectList.data.length; indice ++) {
        const subject = subjectList.data[indice];
        const dataSubject = {
            _id: subject._id,
            title: subject.title,
            illustration: subject.illustration,
            prof: subject.prof
        };
        const result = await Subject.create(dataSubject);
        if (result) counter += 1;
    }
    return counter;
}

const generateAssignmentProf = async () => {
    // generate 2 assignment per subjects
    const deleteAssignment = await AssignmentProf.deleteMany({});
    console.log(deleteAssignment);

    const envNumber = process.env.NUMBER_ASSIGNMENT_PER_SUBJECT;
    const numberAssigment = envNumber ? parseInt(envNumber) : 100;

    const listeSubject = await getAllSubject(null, null, {
        title: "asc"
    }, false);

    const now = new Date();
    const dateDebutAnnee = new Date(now.getFullYear(), 0, 1);
    let counter = 0;
    for (let indiceSubject = 0; indiceSubject < listeSubject.docs.length; indiceSubject++) {
        const subject = listeSubject.docs[indiceSubject];
        for (let indice = 0; indice < numberAssigment; indice++) {
            const dateSubmit= new Date(dateDebutAnnee);
            dateSubmit.setDate(dateSubmit.getDate() + indice);

            const deadline = new Date(dateDebutAnnee);
            deadline.setDate(deadline.getDate() + (indice + 1));

            const assignment = await insertProfAssignment(
                {
                    title: `TP ${indice + 1} - ${subject.title}`,
                    description: `Ce TP se basera sur le slide ${(indice * 10) + 1} à ${(indice * 10) + 10}`,
                    deadline: deadline.getDate()
                },
                {
                    _id: subject.profData._id,
                    name: `${subject.profData.firstname} ${subject.profData.lastname}`,
                    profilePicture: subject.profData.profilPicture
                },{
                    _id: subject._id,
                    title: subject.title,
                    illustration: subject.illustration,
                },
                dateSubmit.getDate()
            );
            if (assignment) counter += 1;
        }
    }
    return counter;
}

const generateAssignmentStudent = async () => {
    // TODO implement generator
    // generate 1 submitted assignment per student for each assignment given by the prof
    const deleteAssignmentStudent = await AssignmentStudent.deleteMany({});
    console.log(deleteAssignmentStudent);

    const listStudent = await getStudents(null, {
        _id: "asc"
    });

    let counter = 0;
    const assignmentProf = await getAllProfAssignment();
    const studentArray = listStudent.docs;
    for (const studentCurrent in studentArray) {
        for (const assignment in assignmentProf) {
            const assignmentStudent = await insertStudentAssignment(
                {
                    remarkStudent: `Bonjour, j'ai fini le ${assignment.title}. Cordialement.`,
                    dateSubmit: assignment.dateSubmit,
                },
                assignment,
                {
                    _id: studentCurrent._id,
                    name: `${studentCurrent.firstname} ${studentCurrent.lastname}`,
                    email: studentCurrent.email,
                    profilePicture: studentCurrent.profilePicture
                },
                "https://docs.google.com/document/d/1Ucnc8KlChs47MYhKEi3op8cU20XSi3wc8XNb57sMqsg/edit?usp=sharing"
            );

            if (assignmentStudent) counter += 1;
        }
    }
    return counter;
}

module.exports = {
    generateProf,
    generateStudent,
    generateSubject,
    generateAssignmentProf,
    generateAssignmentStudent
}