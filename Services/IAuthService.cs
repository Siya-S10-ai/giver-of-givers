using GiftOfGivers.Shared.DTOs;

namespace GiftOfGivers.Client.Services;

public interface IAuthService
{
    Task<AuthResult> LoginAsync(LoginFormDto loginForm);
    Task<AuthResult> RegisterAsync(RegisterFormDto registerForm);
    Task LogoutAsync();
    Task<bool> IsAuthenticatedAsync();
    Task<UserProfileDto?> GetCurrentUserAsync();
}

public class LoginFormDto
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public bool RememberMe { get; set; }
}

public class RegisterFormDto
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string ConfirmPassword { get; set; } = "";
    public string Role { get; set; } = "";
}

public class AuthResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public UserProfileDto? User { get; set; }
}