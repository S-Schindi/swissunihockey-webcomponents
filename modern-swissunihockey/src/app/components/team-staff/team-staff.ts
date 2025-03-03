export interface TeamStaff {
    TeamStaffID: number;
    TeamID: number;
    MemberID: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    Email: string;
    MobilePhone: string;
    TeamStaffRoleName: string;
    ThumbnailURL: string;
    Status: number;
    TeamRoleID: number;
    IsUser: boolean;
    NumberOfTimesInvited: number;
    Editable: boolean;
    Deletable: boolean;
}
