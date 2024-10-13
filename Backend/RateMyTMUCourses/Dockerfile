# 1. Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "RateMyTMUCourses.csproj"
RUN dotnet publish "RateMyTMUCourses.csproj" -c Release -o /app

# 2. Run Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 8080

ENTRYPOINT [ "dotnet", "RateMyTMUCourses.dll" ]
