export interface StudentLoginRequestBody {
  userName: string;
  password: string;
}

export interface NewStudentCodeRequestBody {
  studentName: string;
}

export interface DeleteStudentCodeRequestBody {
  studentName: string;
}

export interface StudentRegRequestBody {
  userName: string;
  password: string;
  specialCode: string;
}

export interface StudentDeleteRequestBody {
  studentName: string;
}
