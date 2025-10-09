using Microsoft.EntityFrameworkCore;
using MedWebApp.Data;
using Microsoft.AspNetCore.Http.Extensions;

namespace MedWebApp.Extentions;


public static class MigrationExtentions
{
    public static void ApplyMigration(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        using MedAppDbContext context = scope.ServiceProvider.GetRequiredService<MedAppDbContext>();
        context.Database.Migrate();
    }
}
