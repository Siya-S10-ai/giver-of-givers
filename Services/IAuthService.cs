using GiftOfGivers.Shared.DTOs;
using System.ComponentModel.DataAnnotations;

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
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; } = "";
    
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = "";
    
    public bool RememberMe { get; set; }
}

public class RegisterFormDto
{
    [Required(ErrorMessage = "First name is required")]
    [StringLength(50, ErrorMessage = "First name must be less than 50 characters")]
    public string FirstName { get; set; } = "";
    
    [Required(ErrorMessage = "Last name is required")]
    [StringLength(50, ErrorMessage = "Last name must be less than 50 characters")]
    public string LastName { get; set; } = "";
    
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; } = "";
    
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
    public string Password { get; set; } = "";
    
    [Required(ErrorMessage = "Please confirm your password")]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = "";
    
    [Required(ErrorMessage = "Please select a role")]
    public string Role { get; set; } = "";
    
    [Phone(ErrorMessage = "Please enter a valid phone number")]
    public string Phone { get; set; } = "";
    
    [Range(typeof(bool), "true", "true", ErrorMessage = "You must accept the terms and conditions")]
    public bool AcceptTerms { get; set; } = false;
}

public class AuthResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public UserProfileDto? User { get; set; }
}