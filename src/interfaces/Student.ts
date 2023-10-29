export interface StudentLoginRequestBody {
  userName: string;
  password: string;
}

export interface NewStudentTokenRequestBody {
  token: string;
  teacherName: string;
  studentName: string;
}

export interface StudentRegRequestBody {
  userName: string;
  password: string;
  specialCode: string;
}
