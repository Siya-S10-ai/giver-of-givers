using Microsoft.AspNetCore.Components;

namespace GiftOfGivers.Client.Shared;

public class LayoutBase : ComponentBase, IDisposable
{
    protected virtual void Dispose(bool disposing)
    {
        // Override in derived classes if needed
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}