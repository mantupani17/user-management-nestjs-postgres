import { IsNumber } from "class-validator";

export class CreateRoleModulePermissionDto {
    @IsNumber()
    moduleId: number;
  
    @IsNumber()
    permissionId: number;
  
    @IsNumber()
    roleId: number;
}
