
export interface GetLessonsRequestParams {
    page: number
}

export interface UserLoginRequestParams {
    wxid: string
}

export interface PatientModel {
    gender: boolean
    name: string
    contact: string
    address: string
    age: number
    avatar: string
}

export interface DoctorModel {
    jobNumber: string
    name: string
    contact: string
    review: boolean
}

export interface UserLoginResponse {
    result: DoctorModel | PatientModel
    type: number
}

export interface UserReigsterPatientRequest {
    wxid: string
    age: number
    name: string
    address?: string
    contact?: string
    gender?: boolean
}

export interface UserReigsterDoctorRequest {
    wxid: string
    name: string
    contact?: string
    jobNumber?: string
}

export interface GetClockInRecordDatesRequest {
    uid: string,
    startDate: string, // 2012-12-12
    endDate: string
}