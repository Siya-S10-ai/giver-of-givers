using GiftOfGivers.Shared.DTOs;

namespace GiftOfGivers.Client.Services;

public interface IApiService
{
    Task<DonationStatsDto> GetDonationStatsAsync();
    Task<List<DonationDto>> GetRecentDonationsAsync();
    Task<DonationResult> ProcessDonationAsync(DonationFormDto donation);
    Task<UserProfileDto> GetUserProfileAsync(string userId);
    Task<bool> UpdateUserProfileAsync(string userId, UserProfileDto profile);
}

public class DonationFormDto
{
    public decimal Amount { get; set; }
    public string Type { get; set; } = "";
    public string Frequency { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Message { get; set; } = "";
}

public class DonationStatsDto
{
    public decimal TotalDonations { get; set; }
    public int ProjectsFunded { get; set; }
    public int LivesImpacted { get; set; }
}

public class DonationDto
{
    public string DonorName { get; set; } = "";
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = "";
}

public class DonationResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
}