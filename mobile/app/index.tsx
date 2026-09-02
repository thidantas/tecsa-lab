import { router, type Href } from "expo-router";
import { ActivityIndicator } from "react-native";

import { useBrand } from "@/core/brand";
import { useHealthQuery } from "@/domain";
import { Button, Card, Text } from "@/ui/components";
import { Screen, ScreenHeader } from "@/ui/containers";

export default function HomeScreen() {
  const { identity } = useBrand();
  const health = useHealthQuery();

  return (
    <Screen>
      <ScreenHeader subtitle={identity.copy.homeSubtitle} />

      <Card gap="s8">
        <Text variant="text16">{identity.copy.healthCardTitle}</Text>
        {health.isPending ? <ActivityIndicator /> : null}
        {health.isSuccess ? (
          <Text variant="text14" color="textMuted">
            status: {health.data.status} · database: {health.data.database}
          </Text>
        ) : null}
        {health.isError ? (
          <Text color="danger">
            {health.error instanceof Error
              ? health.error.message
              : "Falha ao consultar a API"}
          </Text>
        ) : null}
      </Card>

      <Button
        title={identity.copy.patientsTitle}
        onPress={() => {
          router.push("/patients" as Href);
        }}
      />
    </Screen>
  );
}
