import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user-service.service";


export const ReverseAuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router)
    if (userService.isLogged) {
        return false;
    }
    router.navigate(['home']);
    return true;
}