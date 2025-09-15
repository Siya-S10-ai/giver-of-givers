using System.Net.Http.Json;
using GiftOfGivers.Shared.DTOs;
using System.ComponentModel.DataAnnotations;

namespace GiftOfGivers.Client.Services;

public interface IApiService
{
    Task<DonationStatsDto> GetDonationStatsAsync();
    Task<List<DonationDto>> GetRecentDonationsAsync();
    Task<DonationResult> ProcessDonationAsync(DonationFormDto donation);
    Task<UserProfileDto?> GetUserProfileAsync(string userId);
    Task<UserProfileDto> UpdateUserProfileAsync(string userId, UserProfileDto profile);
    Task<ReporterStatsDto> GetReporterStatsAsync(string userId);
    Task<VolunteerStatsDto> GetVolunteerStatsAsync(string userId);
}

public class DonationFormDto
{
    [Required(ErrorMessage = "Donation amount is required")]
    [Range(1, double.MaxValue, ErrorMessage = "Donation amount must be greater than 0")]
    public decimal Amount { get; set; }
    
    [Required(ErrorMessage = "Please select a donation type")]
    public string Type { get; set; } = "";
    
    public string Frequency { get; set; } = "OneTime";
    
    [Required(ErrorMessage = "First name is required")]
    public string FirstName { get; set; } = "";
    
    [Required(ErrorMessage = "Last name is required")]
    public string LastName { get; set; } = "";
    
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; } = "";
    
    public string Message { get; set; } = "";
}

public class DonationStatsDto
{
    public int TotalDonations { get; set; }
    public int FundedProjects { get; set; }
    public int LivesImpacted { get; set; }
}

public class DonationDto
{
    public string DonorName { get; set; } = "";
    public decimal Amount { get; set; }
    public string Type { get; set; } = "";
    public string Message { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

public class DonationResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
}

public class ReporterStatsDto
{
    public int TotalReports { get; set; }
    public int VerifiedReports { get; set; }
}

public class VolunteerStatsDto
{
    public int CompletedTasks { get; set; }
    public int TotalHours { get; set; }
}