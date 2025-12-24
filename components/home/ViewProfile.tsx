import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Mail, 
  Globe, 
  Heart, 
  Star, 
  Calendar, 
  DollarSign,
  Users,
  Plane,
  Compass,
  Trophy
} from "lucide-react";

const UserProfileComponent = ({ userData }: { userData: any }) => {
  const { email, profile, totalReviewCount, reviews } = userData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ======== 1. PREMIUM HEADER SECTION ======== */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-slate-200 dark:border-zinc-800 transition-all">
          {/* Mesh Gradient Backdrop */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.5),transparent)]" />
          </div>
          
          <CardContent className="relative pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Avatar className="h-32 w-32 border-4 border-white dark:border-zinc-900 shadow-2xl relative">
                  <AvatarImage src={profile.profileImage} alt={profile.fullName} className="object-cover" />
                  <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-3xl font-black text-primary">
                    {getInitials(profile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 h-6 w-6 bg-emerald-500 border-4 border-white dark:border-zinc-900 rounded-full shadow-lg" />
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    {profile.fullName}
                  </h1>
                  <Badge className="w-fit mx-auto md:mx-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-none px-3 py-1 font-bold">
                    PRO EXPLORER
                  </Badge>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-default">
                    <Mail className="w-4 h-4" /> {email}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                    <MapPin className="w-4 h-4" /> {profile.currentLocation}
                  </span>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xl font-black text-slate-900 dark:text-white">{totalReviewCount}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Reviews</p>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 text-center">
                   <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                    <Plane className="w-4 h-4" />
                    <span className="text-xl font-black text-slate-900 dark:text-white">{profile.travelPlans.length}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Trips</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* ======== 2. BENTO CONTENT SECTION ======== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Bio & Interests */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-none bg-white dark:bg-zinc-900 shadow-xl rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-rose-500">
                  <Heart className="w-5 h-5 fill-current" /> About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                  "{profile.bio}"
                </p>
                <Separator className="bg-slate-100 dark:bg-zinc-800" />
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest: string, i: number) => (
                      <Badge key={i} className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 border-none font-bold">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white dark:bg-zinc-900 shadow-xl rounded-[2rem] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-500">
                  <Globe className="w-5 h-5" /> World Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.visitedCountries.map((country: string, i: number) => (
                    <Badge key={i} variant="outline" className="border-slate-200 dark:border-zinc-700 font-medium text-slate-600 dark:text-zinc-300">
                      🌍 {country}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Travel Plans */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none bg-white dark:bg-zinc-900 shadow-xl rounded-[2rem] overflow-hidden h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-zinc-800 pb-6">
                <CardTitle className="text-2xl font-black flex items-center gap-3 text-blue-600">
                  <Compass className="w-7 h-7" /> Travel Itineraries
                </CardTitle>
                <Trophy className="w-6 h-6 text-amber-400 opacity-50" />
              </CardHeader>
              <CardContent className="pt-8">
                {profile.travelPlans.length > 0 ? (
                  <div className="space-y-6">
                    {profile.travelPlans.map((plan: any) => (
                      <div key={plan.id} className="group relative p-6 rounded-[1.5rem] bg-slate-50/50 dark:bg-zinc-800/30 border border-slate-100 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {plan.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-1">{plan.description}</p>
                          </div>
                          <Badge className="bg-blue-600 text-white font-bold px-4 py-1 rounded-full shadow-lg shadow-blue-500/20">
                            {plan.travelType}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400">
                            <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"><MapPin className="w-3 h-3 text-blue-500" /></div>
                            {plan.city}, {plan.destination}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400">
                            <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"><Calendar className="w-3 h-3 text-emerald-500" /></div>
                            {formatDate(plan.startDate)}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400">
                            <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"><DollarSign className="w-3 h-3 text-amber-500" /></div>
                            ৳{plan.budgetMin.toLocaleString()} - ৳{plan.budgetMax.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 dark:bg-zinc-800/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-zinc-800">
                    <Plane className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-bold tracking-tight">No adventures planned yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ======== 3. REVIEWS SECTION (Full Width) ======== */}
        <Card className="border-none bg-white dark:bg-zinc-900 shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-2xl font-black flex items-center gap-3 text-amber-500">
              <Star className="w-7 h-7 fill-current" /> Feedback Center
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review: any) => (
                  <div key={review.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                      {review.reviewerName?.charAt(0) || <Users className="w-5 h-5" />}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-slate-300 dark:text-zinc-700'}`} />
                        ))}
                        <span className="text-xs font-black text-slate-900 dark:text-white ml-2">by {review.reviewerName}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 opacity-50">
                <Users className="w-10 h-10 mx-auto mb-3" />
                <p className="font-bold">No community feedback yet</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default UserProfileComponent;