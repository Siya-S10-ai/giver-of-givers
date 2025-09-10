using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace GiftOfGivers.Client.AzureSQL
{
    public class AzureDbContext : DbContext
    {
        public AzureDbContext(DbContextOptions<AzureDbContext> options) : base(options)
        {
        }

        // Add your DbSets here as you define your entities
        // public DbSet<User> Users { get; set; }
        // public DbSet<Report> Reports { get; set; }
        // public DbSet<Donation> Donations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Fallback connection string if not configured via DI
                optionsBuilder.UseSqlServer("your-connection-string-here");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure your entity relationships and constraints here
            
            // Example:
            // modelBuilder.Entity<User>()
            //     .HasIndex(u => u.Email)
            //     .IsUnique();
        }
    }

    public interface IAzureService
    {
        Task<bool> TestConnectionAsync();
        Task<T?> GetByIdAsync<T>(int id) where T : class;
        Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        Task<T> CreateAsync<T>(T entity) where T : class;
        Task<T> UpdateAsync<T>(T entity) where T : class;
        Task<bool> DeleteAsync<T>(int id) where T : class;
    }

    public class AzureService : IAzureService
    {
        private readonly AzureDbContext _context;
        private readonly ILogger<AzureService> _logger;

        public AzureService(AzureDbContext context, ILogger<AzureService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> TestConnectionAsync()
        {
            try
            {
                await _context.Database.CanConnectAsync();
                _logger.LogInformation("Successfully connected to Azure SQL Database");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to connect to Azure SQL Database");
                return false;
            }
        }

        public async Task<T?> GetByIdAsync<T>(int id) where T : class
        {
            try
            {
                return await _context.Set<T>().FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting {EntityType} with ID {Id}", typeof(T).Name, id);
                return null;
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
        {
            try
            {
                return await _context.Set<T>().ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all {EntityType}", typeof(T).Name);
                return Enumerable.Empty<T>();
            }
        }

        public async Task<T> CreateAsync<T>(T entity) where T : class
        {
            try
            {
                _context.Set<T>().Add(entity);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Created new {EntityType}", typeof(T).Name);
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating {EntityType}", typeof(T).Name);
                throw;
            }
        }

        public async Task<T> UpdateAsync<T>(T entity) where T : class
        {
            try
            {
                _context.Set<T>().Update(entity);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated {EntityType}", typeof(T).Name);
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating {EntityType}", typeof(T).Name);
                throw;
            }
        }

        public async Task<bool> DeleteAsync<T>(int id) where T : class
        {
            try
            {
                var entity = await GetByIdAsync<T>(id);
                if (entity != null)
                {
                    _context.Set<T>().Remove(entity);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Deleted {EntityType} with ID {Id}", typeof(T).Name, id);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting {EntityType} with ID {Id}", typeof(T).Name, id);
                return false;
            }
        }
    }
}