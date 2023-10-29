export interface TeacherRegBody {
  userName: string;
  password: string;
  specialCode: string;
}

export interface TeacherLoginBody {
  userName: string;
  password: string;
}

export interface TeacherCredentialsBody {
  token: string;
  teacherName: string;
}
