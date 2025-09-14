using GiftOfGivers.Shared.DTOs;

namespace GiftOfGivers.Client.Services;

public class AuthService : IAuthService
{
    private readonly HttpClient _httpClient;
    private UserProfileDto? _currentUser;

    public AuthService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<AuthResult> LoginAsync(LoginFormDto loginForm)
    {
        // Mock authentication
        await Task.Delay(1000);
        
        if (loginForm.Email == "test@example.com" && loginForm.Password == "password")
        {
            _currentUser = new UserProfileDto
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Test",
                LastName = "User",
                Email = loginForm.Email,
                Role = "Volunteer",
                CreatedAt = DateTime.Now
            };

            return new AuthResult
            {
                Success = true,
                Message = "Login successful",
                User = _currentUser
            };
        }

        return new AuthResult
        {
            Success = false,
            Message = "Invalid email or password"
        };
    }

    public async Task<AuthResult> RegisterAsync(RegisterFormDto registerForm)
    {
        // Mock registration
        await Task.Delay(1500);

        _currentUser = new UserProfileDto
        {
            Id = Guid.NewGuid().ToString(),
            FirstName = registerForm.FirstName,
            LastName = registerForm.LastName,
            Email = registerForm.Email,
            Role = registerForm.Role,
            CreatedAt = DateTime.Now
        };

        return new AuthResult
        {
            Success = true,
            Message = "Registration successful",
            User = _currentUser
        };
    }

    public async Task LogoutAsync()
    {
        await Task.Delay(100);
        _currentUser = null;
    }

    public async Task<bool> IsAuthenticatedAsync()
    {
        await Task.Delay(100);
        return _currentUser != null;
    }

    public async Task<UserProfileDto?> GetCurrentUserAsync()
    {
        await Task.Delay(100);
        return _currentUser;
    }
}