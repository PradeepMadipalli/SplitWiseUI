export class members {
    userId: string;
    userName: string;
    userEmail: string;
}
export class RequestGroup {
    GroupId: string;
    GroupName: string;
    Userlist: string;
    UserId: string;
    Category: string;
    SimplifyDebts: boolean;
    Comments: string;
}
export class EditGroupDetails {
    groupId: string;
    groupName: string;
    userList: string;
    Category: string;
    SimplifyDebts: boolean;
    Comments: string;
}
export class Categories {
    id: string;
    categoriesList: string;
}
export class RequesteditGroup {
    groupid: string;
}
export class RequestExpense {
    expid: string;
    groupId: string;
    Name: string;
    Amount: string;
    Currency: string;
    Date: Date;
    PaidBy: string;
    UserList: string;
    SpiltList: string;
    Notes: string;
    SplitBy: string;
}
export class GetExpenseDetailsRequest {
    groupId: string;
    expId: string;
}
export class Activity {
    Id: string;
    TransId: string;
    UserId: string;
    ReceiverId: string;
    CreatedId: string;
    CreatedBy: string;
    GroupId: string;
    Message: string;
}
export class Transaction {
    TransID: string;
    PaidId: string;
    ReceiverId: string;
    Amount: string;
    TransactionMessage: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdateDBy: string;
}
export class GetTransactionRequest {
    GroupId: string;
}
export class InvitationRequest {
    Name: string;
    Email: string;
}
export class GetInvitationRequest {
    InvitationId: string;
    Name: string;
}
export class GetUsers {
    UserId: string;
    UserName: string;
    UserEmail: string;
}
export class SettleupRequest
{
    PayerId :string;
    PayeeId :string;
    GroupId:string
    Amount :string
    CreaqtedBy:string
    CreaqtedDate :string;
}
export class GetUserById{
    Id:string;
}