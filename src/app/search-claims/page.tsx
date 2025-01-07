"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import useLocalStorageState from "use-local-storage-state";
import { MediaItem } from "@/utils/types";

export interface DataClaims {
  name: string;
  image: string;
  category: string;
  followers: number;
  claimsVerified: number;
  trustedScore: number;
}

interface ClaimsAnalysisResult {
  trueClaims: number;
  falseClaims: number;
  unknownClaims: number;
}

// Define o esquema de validação com Zod
const schema = z.object({
  influencerName: z.string().min(1, "Nome do influenciador é obrigatório"),
  claimsToAnalyze: z
    .number()
    .min(1, "Deve ser pelo menos 1")
    .max(100, "Máximo de 100 claims"),
  timeRange: z.string().min(1, "Selecione um intervalo de tempo"),
  sessionId: z.string().min(1, "Session ID do Instagram é obrigatório"),
  includeRevenue: z.boolean(),
  verifyJournals: z.boolean(),
});

// Define o tipo para os dados do formulário
type FormData = z.infer<typeof schema>;

export default function SearchClaims() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedTimeRange = watch("timeRange");
  const [includeRevenue, setIncludeRevenue] = useState<boolean>(false);
  const [verifyJournals, setVerifyJournals] = useState<boolean>(false);
  const [claimsData, setClaimsData] = useLocalStorageState<DataClaims[]>(
    "claims",
    {
      defaultValue: [],
    }
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influencerName: data.influencerName,

          sessionId: data.sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result: MediaItem = await response.json()

      console.log("Posts encontrados:", result);

      const influencerExists = claimsData.some(
        (existingInfluencer) => existingInfluencer.name === result.user.username
      );

      if (influencerExists) {
        alert("This influencer has already been analyzed!");
        return;
      }

      // Extrair e agrupar todos os textos dos posts
      const allTexts = result.posts
        .map((post) => {
          const caption =
            post.node.edge_media_to_caption.edges[0]?.node.text || "";
          const date = new Date(post.node.taken_at_timestamp * 1000)
            .toISOString()
            .split("T")[0];
          return caption ? `[Post date: ${date}]\n${caption}` : "";
        })
        .filter((text) => text.length > 0)
        .slice(0, 5) // Limita a 6 itens
        .join("\n\n---\n\n");

      // Criar o prompt para o Gemini
      const prompt = allTexts;

      console.log("qqqq", prompt);

      // Fazer a chamada para a API do Gemini
      const geminiResponse = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          influencerName: data.influencerName,
        }),
      });

      if (!geminiResponse.ok) {
        throw new Error("Failed to analyze claims with AI");
      }

      const res = await geminiResponse.json();
      console.log("resss", res);
      console.log("resss2", res.analysis);

      // Agora, a string do "analysis" pode ser convertida em um objeto JSON novamente
      const analysis: ClaimsAnalysisResult = res.analysis;
      console.log("AI Analysis:", analysis);

      const { falseClaims, trueClaims, unknownClaims } = analysis;

      const trustedScore =
        ((trueClaims - falseClaims) /
          (trueClaims + falseClaims + unknownClaims)) *
        100;

      const influencerData = {
        name: result.user.username,
        image: (result.user as unknown as { user: { profile_pic_url: string } })?.user?.profile_pic_url,
        category: "health",
        followers: result.user.followers,
        claimsVerified: falseClaims + trueClaims + unknownClaims, // A quantidade de claims verificados pode ser o total de claims
        trustedScore,
      };

      // Atualizar o estado apenas se o influencer não existir
      setClaimsData((prevData) => [...prevData, influencerData]);
      // TODO: Mostrar os resultados na interface
    } catch (err) {
      console.error("Error processing posts:", err);
      alert("Error processing influencer data");
    }
  };

  console.log("data", claimsData);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-navy p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="text-primary hover:text-primary/90 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Research Tasks</h1>
        </div>

        {/* Research Configuration */}
        <div className="bg-navy-light rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Research Configuration
          </h2>

          {/* Time Range */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Time Range</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["last-week", "last-month", "last-year", "all-time"].map(
                (range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setValue("timeRange", range);
                    }}
                    className={`p-2 rounded-lg border border-gray-700 text-sm ${
                      selectedTimeRange === range
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:bg-navy-light"
                    }`}
                  >
                    {range
                      .replace("-", " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </button>
                )
              )}
            </div>
            <input
              type="hidden"
              {...register("timeRange", {
                required: "Selecione um intervalo de tempo",
              })}
              value={selectedTimeRange}
            />
            {errors.timeRange && (
              <p className="text-red-500 text-sm">{errors.timeRange.message}</p>
            )}
          </div>

          {/* Influencer Name */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Influencer&apos;s instagram
            </label>
            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter influencer name"
                {...register("influencerName")}
                className={`w-full bg-navy border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary ${
                  errors.influencerName ? "border-red-500" : ""
                }`}
              />
              {errors.influencerName && (
                <p className="text-red-500 text-sm">
                  {errors.influencerName.message}
                </p>
              )}
            </div>
          </div>

          {/* Instagram Session ID - Adicionar após o campo de Influencer Name */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Instagram Session ID
            </label>
            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type="password"
                placeholder="Paste your Instagram Session ID here"
                {...register("sessionId")}
                className={`w-full bg-navy border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary ${
                  errors.sessionId ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.sessionId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sessionId.message}
              </p>
            )}
            <p className="text-gray-400 text-sm mt-1">
              Encontre seu Session ID nas cookies do Instagram após fazer login
            </p>
          </div>

          {/* Claims to Analyze */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Claims to Analyze Per Influencer
            </label>
            <input
              type="number"
              defaultValue={50}
              {...register("claimsToAnalyze", { valueAsNumber: true })}
              className={`w-full bg-navy border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary ${
                errors.claimsToAnalyze ? "border-red-500" : ""
              }`}
            />
            {errors.claimsToAnalyze && (
              <p className="text-red-500 text-sm">
                {errors.claimsToAnalyze.message}
              </p>
            )}
            <p className="text-gray-400 text-sm mt-1">
              Recommended: 50-100 claims for comprehensive analysis
            </p>
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Include Revenue Analysis
                </h4>
                <p className="text-gray-400 text-sm">
                  Analyze monetization methods and estimate earnings
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("includeRevenue")}
                  className="sr-only peer"
                  checked={includeRevenue}
                  onChange={() => setIncludeRevenue((prev) => !prev)}
                />
                <div
                  className={`w-12 h-6 bg-gray-700 rounded-full peer-checked:bg-primary transition-colors flex items-center`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      includeRevenue ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Verify with Scientific Journals
                </h4>
                <p className="text-gray-400 text-sm">
                  Cross-reference claims with scientific literature
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("verifyJournals")}
                  className="sr-only peer"
                  checked={verifyJournals}
                  onChange={() => setVerifyJournals((prev) => !prev)}
                />
                <div
                  className={`w-12 h-6 bg-gray-700 rounded-full peer-checked:bg-primary transition-colors flex items-center`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      verifyJournals ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Start Research Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Start Research
          </button>
        </div>
      </div>
    </form>
  );
}
